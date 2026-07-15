const { buildOrderMessage } = require("./messageBuilder");
const whatsappProvider = require("./providers/whatsappProvider");

const notifyCustomer = async ({
    event,
    order,
    customerPhone,
    integration,
    invoiceId = null
}) => {

    const message = buildOrderMessage({

        type: event,

        order,

        invoiceId

    });

    if (!message) return;

    await whatsappProvider.sendMessage({

        to: customerPhone,

        message,

        integration

    });

};

module.exports = {

    notifyCustomer

};