const parseOrder = async (input) => {
    console.log("Running parseOrder with input:", input);
    return {
        customerPhone: input.rawMessage?.from || "unknown",
        items: [{ name: "sugar", qty: 5, unit: "kg" }],
        confidence: 0.95
    };
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