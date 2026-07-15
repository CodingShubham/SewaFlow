/*
|--------------------------------------------------------------------------
| Order State Service
|--------------------------------------------------------------------------
|
| Single source of truth for every Order state transition.
| Nothing else in the project should modify order.status directly.
|
*/
const { dispatchOrderEvent } = require("./orderEventDispatcher");

const confirmOrder = async (
    order,
    by = "system"
) => {

    order.status = "confirmed";
    order.approvalStatus = "approved";

    order.timeline.push({
        event: "confirmed",
        by,
        note: "Order confirmed"
    });

    await order.save();

    await dispatchOrderEvent(

    "ORDER_CONFIRMED",

    {

        order

    }

);

    return order;
};


/*
|--------------------------------------------------------------------------
| Reject Order
|--------------------------------------------------------------------------
*/

const rejectOrder = async (
    order,
    by = "owner",
    note = "Order rejected"
) => {

    order.status = "rejected";
    order.approvalStatus = "rejected";

    order.timeline.push({
        event: "rejected",
        by,
        note
    });

    await order.save();

    await dispatchOrderEvent(

    "ORDER_REJECTED",

    {

        order

    }

);

    return order;
};


/*
|--------------------------------------------------------------------------
| Start Processing
|--------------------------------------------------------------------------
*/

const startProcessing = async (
    order,
    by = "owner"
) => {

    order.status = "processing";

    order.timeline.push({
        event: "processing",
        by,
        note: "Order processing started"
    });

    await order.save();

    await dispatchOrderEvent(

    "ORDER_PROCESSING",

    {

        order

    }

);

    return order;
};


/*
|--------------------------------------------------------------------------
| Complete Order
|--------------------------------------------------------------------------
*/

const completeOrder = async (
    order,
    by = "owner"
) => {

    order.status = "completed";

    order.timeline.push({
        event: "completed",
        by,
        note: "Order completed"
    });

    await order.save();

    await dispatchOrderEvent(

    "ORDER_COMPLETED",

    {

        order

    }

);

    return order;
};


/*
|--------------------------------------------------------------------------
| Cancel Order
|--------------------------------------------------------------------------
*/

const cancelOrder = async (
    order,
    by = "owner",
    note = "Order cancelled"
) => {

    order.status = "cancelled";

    order.timeline.push({
        event: "cancelled",
        by,
        note
    });

    await order.save();

    await dispatchOrderEvent(

    "ORDER_CANCELLED",

    {

        order

    }

);

    return order;
};

module.exports = {

    confirmOrder,

    rejectOrder,

    startProcessing,

    completeOrder,

    cancelOrder

};