const Order = require("../Model/Order");

/*
|--------------------------------------------------------------------------
| Normalize Items
|--------------------------------------------------------------------------
*/

const normalizeItems = (items = []) => {

    return items
        .map(item => ({

            name: item.name?.trim().toLowerCase(),

            qty: Number(item.qty),

            unit: (item.unit || "").trim().toLowerCase()

        }))
        .sort((a, b) => a.name.localeCompare(b.name));

};

/*
|--------------------------------------------------------------------------
| Duplicate Order Validation
|--------------------------------------------------------------------------
*/

const validateDuplicateOrder = async (input) => {

    const {

        customerId,

        userId,

        items

    } = input;

    if (!customerId || !userId || !items?.length) {

        return {

            shouldContinue: true

        };

    }

    //------------------------------------------------------
    // Find recent active orders
    //------------------------------------------------------

    const recentOrders = await Order.find({

        userId,

        customerId,

status: {
    $in: [
        "pending",
        "confirmed",
        "processing",
        "completed"
    ]
},

        createdAt: {

            $gte: new Date(Date.now() - 5 * 60 * 1000)

        }

    });

    if (!recentOrders.length) {

        return {

            shouldContinue: true

        };

    }

    //------------------------------------------------------
    // Normalize incoming items
    //------------------------------------------------------

    const incomingItems = normalizeItems(items);

    //------------------------------------------------------
    // Compare with existing orders
    //------------------------------------------------------

    for (const order of recentOrders) {

        const existingItems = normalizeItems(order.items);

        if (

            JSON.stringify(existingItems) ===

            JSON.stringify(incomingItems)

        ) {

            console.log(

                `Duplicate order detected: ${order.orderNumber}`

            );

            return {

                shouldContinue: false,

                reason: `Duplicate order detected. Existing Order: ${order.orderNumber}`,

                duplicateOrderId: order._id,

                duplicateOrderNumber: order.orderNumber

            };

        }

    }

    return {

        shouldContinue: true

    };

};

module.exports = {

    validateDuplicateOrder

};