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
                `Updated product ${product.name}: ${product.stock} remaining`
            );

        } else {

            console.log(
                `Product not found: ${item.name} — behaviour: ${outOfStockBehaviour}`
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

 return {

    updated: true,

    inventoryUpdated: true,

    items: updatedItems,

    order: input.order

};
};



const generateInvoice = async (input) => {

    const { workflow, userId } = input;


    if (!input.inventoryUpdated) {

    throw new Error(
        "Cannot generate invoice before inventory update."
    );

}

    // Resume execution support
    const customerId = input.order
        ? input.order.customerId
        : input.customerId;

    const items = input.order
        ? input.order.items
        : input.items;

    const totalAmount = input.order
        ? input.order.totalAmount
        : items.reduce((sum, item) => sum + (item.total || 0), 0);

    const invoiceGeneration =
        workflow?.config?.invoiceGeneration || "on_confirmation";

    if (invoiceGeneration === "manual") {

        console.log("Invoice generation is manual - skipping automatic invoice.");

        return {
            invoiceId: null,
            amount: totalAmount,
            items,
            pendingApproval: true,
            order: input.order
        };

    }

    const invoice = await Invoice.create({

        userId,

        customerId,

        items,

        totalAmount

    });

    console.log("Invoice created:", invoice._id);

    return {

        invoiceCreated: true,

        invoiceId: invoice._id,

        amount: totalAmount,

        items,

        order: input.order

    };

};

module.exports = generateInvoice;


const notifyCustomer = async (input) => {
    const { customerPhone, invoiceId, amount, items, integration, workflow } = input;

    const notificationsEnabled = workflow?.config?.notificationsEnabled !== false;

    if (!notificationsEnabled) {
        console.log("Notifications disabled — skipping WhatsApp confirmation");
        return { sent: false, message: null };
    }

    if (!input.invoiceCreated) {

    throw new Error(
        "Cannot notify customer before invoice generation."
    );

}

    const accessToken = integration?.accessToken || process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = integration?.phoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID;

    const itemList = items
        .map(item => `${item.name} x${item.qty} ${item.unit}`)
        .join(', ');

    const message = `Hello! Your order has been confirmed.\n\nItems: ${itemList}\nTotal: ₹${amount}\nInvoice ID: ${invoiceId}\n\nThank you for your order!`;

    try {
        await axios.post(
            `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
            {
                messaging_product: "whatsapp",
                to: customerPhone,
                type: "text",
                text: { body: message }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );
        console.log("WhatsApp confirmation sent to:", customerPhone);
        return { sent: true, message };

    } catch (error) {
        console.error("notifyCustomer error:", error.message);
        return { sent: false, message: null };
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

