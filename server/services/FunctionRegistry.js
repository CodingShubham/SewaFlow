// 

const Groq = require("groq-sdk");
const { parseOrderPrompt } = require("./Prompts");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const parseOrder = async (input) => {
    const text = input.rawMessage?.text || "";
    const from = input.rawMessage?.from || "unknown";

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: parseOrderPrompt(text, from)
                }
            ],
            model: "llama-3.3-70b-versatile",
        });

        const response = completion.choices[0]?.message?.content?.trim();
        const parsed = JSON.parse(response);
        console.log("Parsed order:", parsed);
        return parsed;

    } catch (error) {
        console.error("parseOrder AI error:", error.message);
        return {
            customerPhone: from,
            items: [],
            confidence: 0.1
        };
    }
};

const createCustomer = async (input) => {
    console.log("Running createCustomer with input:", input);
    return {
        customerId: "fake_customer_id_123",
        customerPhone: input.customerPhone
    };
};

const generateInvoice = async (input) => {
    console.log("Running generateInvoice with input:", input);
    return {
        invoiceId: "fake_invoice_id_456",
        amount: 250,
        items: input.items
    };
};

const updateInventory = async (input) => {
    console.log("Running updateInventory with input:", input);
    return {
        updated: true,
        items: input.items
    };
};

const notifyCustomer = async (input) => {
    console.log("Running notifyCustomer with input:", input);
    return {
        sent: true,
        message: `Order confirmed. Invoice ${input.invoiceId} generated.`
    };
};

const functionRegistry = {
    parseOrder,
    createCustomer,
    generateInvoice,
    updateInventory,
    notifyCustomer
};

module.exports = functionRegistry;