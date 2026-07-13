const buildOrderMessage = ({
    type,
    order,
    invoiceId
}) => {

    switch (type) {

        case "confirmed":

            return `✅ Your order ${order.orderNumber} has been confirmed.

Total: ₹${order.totalAmount}

Invoice: ${invoiceId}

Thank you for your order!`;

        case "processing":

            return `📦 Your order ${order.orderNumber} is now being prepared.`;

        case "completed":

            return `🎉 Your order ${order.orderNumber} has been completed.

Thank you for shopping with us!`;

        case "cancelled":

            return `❌ Your order ${order.orderNumber} has been cancelled.`;

        case "rejected":

            return `❌ Sorry, we are unable to process your order.`;

        default:

            return "";
    }

};

module.exports = {
    buildOrderMessage
};