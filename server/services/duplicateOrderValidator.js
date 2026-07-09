const Order = require("../Model/Order");

const validateDuplicateOrder = async (input) => {

    const customerId = input.customer?._id;

    if (!customerId) {
        return {
            shouldContinue: true
        };
    }

    // Look for recent pending/confirmed orders from same customer
    const recentOrder = await Order.findOne({
        customerId,
        status: {
            $in: ["pending", "confirmed"]
        },
        createdAt: {
            $gte: new Date(Date.now() - 2 * 60 * 1000) // last 2 minutes
        }
    }).sort({ createdAt: -1 });

    if (!recentOrder) {
        return {
            shouldContinue: true
        };
    }

    // Compare items
    const oldItems = JSON.stringify(recentOrder.items);
    const newItems = JSON.stringify(input.items);

    if (oldItems === newItems) {

        return {
            shouldContinue: false,
            reason: "Duplicate order detected."
        };

    }

    return {
        shouldContinue: true
    };

};

module.exports = {
    validateDuplicateOrder
};