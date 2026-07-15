const Order = require("../Model/Order");

/*
|--------------------------------------------------------------------------
| Create Order
|--------------------------------------------------------------------------
*/

const createOrder = async ({
    userId,
    customerId,
    workflowId,
    workflow,
    items,
    source = "whatsapp",
    customerMessage = {
        text: "",
        type: "text"
    },
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

        customerMessage,

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
                : "pending",

        paymentStatus: "pending",

        inventoryReserved: false,

        invoiceGenerated: false,

        timeline: [
            {
                event:
                    approvalMode === "automatic"
                        ? "confirmed"
                        : "pending",

                by: "system",

                note:
                    approvalMode === "automatic"
                        ? "Order created and auto confirmed"
                        : "Order created and waiting approval"
            }
        ]

    });

    console.log("Order created:", order._id);

    return order;

};

/*
|--------------------------------------------------------------------------
| Get Order
|--------------------------------------------------------------------------
*/

const getOrderById = async (orderId) => {

    return Order.findById(orderId)
        .populate("customerId")
        .populate("items.productId");

};

/*
|--------------------------------------------------------------------------
| Update Order Status
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Update Approval Status
|--------------------------------------------------------------------------
*/

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