const formatItems = (items = []) => {
    return items
        .map(i => `• ${i.name} × ${i.qty}`)
        .join("\n");
};

/*
|--------------------------------------------------------------------------
| Individual Messages
|--------------------------------------------------------------------------
*/

const buildOrderConfirmed = ({ order }) => {
    return `✅ Your order has been confirmed.

Order No: ${order.orderNumber}

${formatItems(order.items)}

Total: ₹${order.totalAmount}

We have started preparing your order.`;
};

const buildOrderProcessing = ({ order }) => {
    return `📦 Your order is now being prepared.

Order No: ${order.orderNumber}

We'll notify you again once it is completed.`;
};

const buildOrderCompleted = ({ order }) => {
    return `🎉 Your order has been completed.

Order No: ${order.orderNumber}

Thank you for shopping with us ❤️`;
};

const buildOrderRejected = ({ order }) => {
    return `❌ Unfortunately we couldn't accept your order.

Order No: ${order.orderNumber}

If you have any questions, please contact us.`;
};

const buildOrderCancelled = ({ order }) => {
    return `⚠️ Your order has been cancelled.

Order No: ${order.orderNumber}

If this was unexpected, please contact us.`;
};

/*
|--------------------------------------------------------------------------
| Generic Builder
|--------------------------------------------------------------------------
*/

const buildOrderMessage = ({ type, order, invoiceId }) => {

    switch (type) {

        case "ORDER_CONFIRMED":
            return buildOrderConfirmed({ order, invoiceId });

        case "ORDER_PROCESSING":
            return buildOrderProcessing({ order, invoiceId });

        case "ORDER_COMPLETED":
            return buildOrderCompleted({ order, invoiceId });

        case "ORDER_REJECTED":
            return buildOrderRejected({ order, invoiceId });

        case "ORDER_CANCELLED":
            return buildOrderCancelled({ order, invoiceId });

        default:
            return null;
    }
};

module.exports = {

    buildOrderMessage,

    buildOrderConfirmed,

    buildOrderProcessing,

    buildOrderCompleted,

    buildOrderRejected,

    buildOrderCancelled

};