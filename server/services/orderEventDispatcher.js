const Customer = require("../Model/Customer");
const Integration = require("../Model/Integrations");

const notificationService = require("./notificationService");

const dispatchOrderEvent = async (
    event,
    { order }
) => {

    //---------------------------------------------------
    // Load Customer
    //---------------------------------------------------

    const customer = await Customer.findById(
        order.customerId
    );

    if (!customer) {

        console.log("Customer not found.");

        return;

    }

    //---------------------------------------------------
    // Load Integration
    //---------------------------------------------------

    const integration = await Integration.findOne({

        userId: order.userId,

        type: "whatsapp",

        status: "connected"

    });

    if (!integration) {

        console.log("WhatsApp integration not found.");

        return;

    }

    //---------------------------------------------------
    // Send notification
    //---------------------------------------------------

    await notificationService.notifyCustomer({

        event,

        order,

        customerPhone: customer.phone,

        integration: {

            accessToken:
                integration.credentials.accessToken,

            phoneNumberId:
                integration.credentials.phoneNumberId

        }

    });

};

module.exports = {

    dispatchOrderEvent

};