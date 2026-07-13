const Order = require("../Model/Order");

/*
|--------------------------------------------------------------------------
| Confirm Order
|--------------------------------------------------------------------------
*/

const confirmOrder = async (order, by = "system") => {

    order.status = "confirmed";

    order.approvalStatus = "approved";

    order.timeline.push({
        status: "confirmed",
        by,
        note: "Order confirmed"
    });

    await order.save();

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

    order.status = "cancelled";

    order.approvalStatus = "rejected";

    order.timeline.push({
        status: "cancelled",
        by,
        note
    });

    await order.save();

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
        status: "processing",
        by,
        note: "Order processing started"
    });

    await order.save();

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
        status: "completed",
        by,
        note: "Order completed"
    });

    await order.save();

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
        status: "cancelled",
        by,
        note
    });

    await order.save();

    return order;

};

module.exports = {

    confirmOrder,

    rejectOrder,

    startProcessing,

    completeOrder,

    cancelOrder

};