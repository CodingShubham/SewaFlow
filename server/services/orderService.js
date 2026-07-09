const Order = require("../Model/Order");

const createOrder = async ({
    userId,
    customerId,
    workflowId,
    items,
    source = "whatsapp",
    notes = ""
}) => {

    const totalAmount = items.reduce(
        (sum, item) => sum + (item.total || 0),
        0
    );

    const approvalMode = input.workflow.config?.approvalMode || "automatic";

    const order = await Order.create({

    userId: input.userId,

    customerId: customer._id,

    workflowId: input.workflow._id,

    source: "whatsapp",

    items,

    totalAmount,

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

const updateOrderStatus = async (orderId, status) => {

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