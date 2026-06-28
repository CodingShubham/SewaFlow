const Groq = require("groq-sdk");
const { parseOrderPrompt } = require("./Prompts");
const Customer = require("../Model/Customer");
const Inventory = require("../Model/Inventory");
const Invoice = require("../Model/Invoice");
const axios = require("axios");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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

const updateInventory = async (input) => {
    const { items, userId, workflow } = input;
    const updatedItems = [];

    const outOfStockBehaviour = workflow?.config?.outOfStockBehaviour || "notify";

    for (const item of items) {
        const inventoryItem = await Inventory.findOne({
            userId,
            itemName: { $regex: new RegExp(item.name, 'i') }
        });

        if (inventoryItem) {
            inventoryItem.quantity -= item.qty;
            await inventoryItem.save();
            updatedItems.push({
                name: item.name,
                qty: item.qty,
                unit: item.unit,
                pricePerUnit: inventoryItem.pricePerUnit,
                total: item.qty * inventoryItem.pricePerUnit
            });
            console.log(`Updated inventory for ${item.name}: ${inventoryItem.quantity} remaining`);
        } else {
            console.log(`Item not found in inventory: ${item.name} — behaviour: ${outOfStockBehaviour}`);
            updatedItems.push({
                name: item.name,
                qty: item.qty,
                unit: item.unit,
                pricePerUnit: 0,
                total: 0,
                outOfStock: true,
                behaviour: outOfStockBehaviour
            });
        }
    }

    return { updated: true, items: updatedItems };
};

const generateInvoice = async (input) => {
    const { customerId, userId, items, workflow } = input;

    const invoiceMode = workflow?.config?.invoiceMode || "automatic";

    if (invoiceMode === "manual") {
        console.log("Invoice mode is manual — skipping auto generation");
        return {
            invoiceId: null,
            amount: 0,
            items,
            pendingApproval: true
        };
    }

    const totalAmount = items.reduce((sum, item) => sum + (item.total || 0), 0);

    const invoice = await Invoice.create({
        userId,
        customerId,
        items,
        totalAmount
    });

    console.log("Invoice created:", invoice._id, "Total:", totalAmount);

    return {
        invoiceId: invoice._id,
        amount: totalAmount,
        items
    };
};

const notifyCustomer = async (input) => {
    const { customerPhone, invoiceId, amount, items, integration, workflow } = input;

    const notificationsEnabled = workflow?.config?.notificationsEnabled !== false;

    if (!notificationsEnabled) {
        console.log("Notifications disabled — skipping WhatsApp confirmation");
        return { sent: false, message: null };
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

const functionRegistry = {
    parseOrder,
    createCustomer,
    updateInventory,
    generateInvoice,
    notifyCustomer
};

module.exports = functionRegistry;