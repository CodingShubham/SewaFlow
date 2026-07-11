const Order = require("../Model/Order");

const createOrder = async ({
    userId,
    customerId,
    workflowId,
    workflow,
    items,
    source = "whatsapp",
    notes = ""
}) => {

    const totalAmount = items.reduce(
        (sum, item) => sum + (item.total || 0),
        0
    );

    const approvalMode =
        workflow?.config?.approvalMode || "automatic";

    const orderNumber =
    "ORD-" +
    Date.now() +
    "-" +
    Math.floor(Math.random() * 1000);

    const order = await Order.create({

        orderNumber,
        
        userId,

        customerId,

        workflowId,

        source,

        items,

        totalAmount,

        notes,

        status:
            approvalMode === "automatic"
                ? "confirmed"
                : "pending",

        approvalStatus:
            approvalMode === "automatic"
                ? "approved"
                : "pending"

    });

    console.log("Order created:", order._id);

    return order;

};

const getOrderById = async (orderId) => {

    return Order.findById(orderId)
        .populate("customerId")
        .populate("items.productId");

};

const updateOrderStatus = async (
    orderId,
    status
) => {

    return Order.findByIdAndUpdate(

        orderId,

        {
            status
        },

        {
            new: true
        }

    );

};

const updateApprovalStatus = async (
    orderId,
    approvalStatus
) => {

    return Order.findByIdAndUpdate(

        orderId,

        {
            approvalStatus
        },

        {
            new: true
        }

    );

};

module.exports = {

    createOrder,

    getOrderById,

    updateOrderStatus,

    updateApprovalStatus

};