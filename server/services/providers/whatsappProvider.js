const axios = require("axios");

const sendMessage = async ({
    to,
    message,
    integration
}) => {

    const accessToken =
        integration?.accessToken ||
        process.env.WHATSAPP_ACCESS_TOKEN;

    const phoneNumberId =
        integration?.phoneNumberId ||
        process.env.WHATSAPP_PHONE_NUMBER_ID;

    await axios.post(

        `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,

        {

            messaging_product: "whatsapp",

            to,

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

};

module.exports = {

    sendMessage

};