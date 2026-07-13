const Groq = require("groq-sdk");
const { parseOrderPrompt } = require("./Prompts");
const Customer = require("../Model/Customer");
const Invoice = require("../Model/Invoice");
const axios = require("axios");
const productProvider = require("./productProvider");
const orderService = require("./orderService");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const { decideOrderExecution } = require("./decisionEngine");
const { validateBusinessRules } = require("./businessValidator");
const { validateDuplicateOrder } = require("./duplicateOrderValidator");
const Order = require("../Model/Order");
const { buildOrderMessage } = require("./messageBuilder");

const parseOrder = async (input) => {
    const text = input.rawMessage?.text || "";
    const from = input.rawMessage?.from || "unknown";

    try {
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: parseOrderPrompt(text, from) }],
            model: "llama-3.3-70b-versatile",
        });

        const response = completion.choices[0]?.message?.content?.trim();
        const parsed = JSON.parse(response);
        console.log("Parsed order:", parsed);
        return parsed;

    } catch (error) {
        console.error("parseOrder AI error:", error.message);
        return { customerPhone: from, items: [], confidence: 0.1 };
    }
};


const validateOrder = async (input) => {

    console.log("Running Decision Engine...");

    return await decideOrderExecution(input);

};

const validateBusiness = async (input) => {

    console.log("Running Business Validation...");

    return await validateBusinessRules(input);

};

const validateDuplicate = async (input) => {

    console.log("Checking Duplicate Order...");

    return await validateDuplicateOrder(input);

};

const createCustomer = async (input) => {
    const { customerPhone, userId } = input;

    let customer = await Customer.findOne({ phone: customerPhone, userId });

    if (!customer) {
        customer = await Customer.create({ userId, phone: customerPhone });
        console.log("New customer created:", customer._id);
    } else {
        customer.totalOrders += 1;
        await customer.save();
        console.log("Existing customer found:", customer._id);
    }

    return {
        customerId: customer._id,
        customerPhone: customer.phone
    };
};


const createOrder = async (input) => {

    const {
        customerId,
        userId,
        workflow,
        items
    } = input;

    const order = await orderService.createOrder({

    userId,

    customerId,

    workflowId: workflow?._id,

    workflow,

    source: "whatsapp",

    items

});

    return {

        orderId: order._id,

        orderStatus: order.status,

        approvalStatus: order.approvalStatus,

        items

    };

};


const updateInventory = async (input) => {

    const userId = input.userId;
    const workflow = input.workflow;

    const items = input.order
        ? input.order.items
        : input.items;

    const updatedItems = [];

    const outOfStockBehaviour =
        workflow?.config?.outOfStockBehaviour || "notify";

    for (const item of items) {

        const product = await productProvider.getProductByName(
            userId,
            item.name
        );

        if (product) {

            product.stock -= item.qty;

            await product.save();

            updatedItems.push({
                productId: product._id,
                name: product.name,
                qty: item.qty,
                unit: product.unit,
                pricePerUnit: product.price,
                total: item.qty * product.price
            });

            console.log(
                `Updated ${product.name} stock : ${product.stock}`
            );

        } else {

            console.log(
                `Product not found : ${item.name}`
            );

            updatedItems.push({
                name: item.name,
                qty: item.qty,
                unit: item.unit,
                price: 0,
                total: 0,
                outOfStock: true,
                behaviour: outOfStockBehaviour
            });

        }

    }

    //--------------------------------------------------
    // Update Order
    //--------------------------------------------------

    const order = await Order.findById(input.order._id);

    order.inventoryReserved = true;

    order.timeline.push({
        status: "inventory_updated"
    });

    await order.save();

    //--------------------------------------------------

    return {

        updated: true,

        inventoryUpdated: true,

        items: updatedItems,

        order

    };

};



const generateInvoice = async (input) => {

    const { workflow, userId } = input;

    if (!input.inventoryUpdated) {

        throw new Error(
            "Cannot generate invoice before inventory update."
        );

    }

    const customerId = input.order.customerId;

    const items = input.order.items;

    const totalAmount = input.order.totalAmount;

    const invoiceMode =
        workflow?.config?.invoiceMode || "automatic";

    if (invoiceMode !== "automatic") {

        console.log("Invoice generation skipped.");

        return {

            invoiceCreated: false,

            invoiceId: null,

            amount: totalAmount,

            items,

            order: input.order

        };

    }

    //------------------------------------------------------
    // Create Invoice
    //------------------------------------------------------

    const invoice = await Invoice.create({

        userId,

        customerId,

        items,

        totalAmount

    });

    //------------------------------------------------------
    // Update Order
    //------------------------------------------------------

    const order = await Order.findById(input.order._id);

    order.invoiceGenerated = true;

    order.timeline.push({

        status: "invoice_generated"

    });

    await order.save();

    //------------------------------------------------------

    console.log("Invoice created:", invoice._id);

    return {

        invoiceCreated: true,

        invoiceId: invoice._id,

        amount: totalAmount,

        items,

        order

    };

};



const notifyCustomer = async (input) => {

    const {
        customerPhone,
        integration,
        workflow,
        order,
        invoiceId
    } = input;

    const notificationsEnabled =
        workflow?.config?.notificationsEnabled !== false;

    if (!notificationsEnabled) {

        console.log("Notifications disabled.");

        return {
            sent: false
        };

    }

    const accessToken =
        integration?.accessToken ||
        process.env.WHATSAPP_ACCESS_TOKEN;

    const phoneNumberId =
        integration?.phoneNumberId ||
        process.env.WHATSAPP_PHONE_NUMBER_ID;

    //--------------------------------------------------
    // Build message
    //--------------------------------------------------

    const message = buildOrderMessage({

        type: "confirmed",

        order,

        invoiceId

    });

    //--------------------------------------------------

    try {

        await axios.post(

            `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,

            {

                messaging_product: "whatsapp",

                to: customerPhone,

                type: "text",

                text: {

                    body: message

                }

            },

            {

                headers: {

                    Authorization: `Bearer ${accessToken}`,

                    "Content-Type": "application/json"

                }

            }

        );

        console.log("WhatsApp notification sent.");

        return {

            sent: true,

            message,

            order

        };

    }

    catch (error) {

        console.error(error.message);

        return {

            sent: false,

            order

        };

    }

};


module.exports = {

    parseOrder,

    validateOrder,

    validateBusiness,

    validateDuplicate,

    createCustomer,

    createOrder,

    updateInventory,

    generateInvoice,

    notifyCustomer

};

