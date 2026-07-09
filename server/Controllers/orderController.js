const Order = require("../Model/Order");
const Workflow = require("../Model/WorkFlow");
const executeWorkflow = require("../services/executionEngine");


const getOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            userId: req.user._id

        })

        .populate("customerId")

        .sort({

            createdAt: -1

        });

        res.status(200).json(orders);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


const getOrderById = async (req, res) => {

    try {

        const order = await Order.findOne({

            _id: req.params.id,

            userId: req.user._id

        })

        .populate("customerId")

        .populate("workflowId");

        if (!order) {

            return res.status(404).json({

                message: "Order not found"

            });

        }

        res.status(200).json(order);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


const rejectOrder = async (req, res) => {

    try {

        const order = await Order.findOne({

            _id: req.params.id,

            userId: req.user._id

        });

        if (!order) {

            return res.status(404).json({

                message: "Order not found"

            });

        }

        if (order.approvalStatus === "approved") {

            return res.status(400).json({

                message: "Approved orders cannot be rejected."

            });

        }

        if (order.approvalStatus === "rejected") {

            return res.status(400).json({

                message: "Order already rejected."

            });

        }

        order.approvalStatus = "rejected";
        order.status = "cancelled";

        await order.save();

        res.status(200).json({

            message: "Order rejected successfully.",

            order

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

const approveOrder = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        if (order.approvalStatus === "approved") {
            return res.status(400).json({
                message: "Order already approved"
            });
        }

        const workflow = await Workflow.findById(order.workflowId);

        if (!workflow) {
            return res.status(404).json({
                message: "Workflow not found"
            });
        }

        const eventData = {

            workflow,

            userId: order.userId,

            customerId: order.customerId,

            order

        };

        const result = await executeWorkflow(

            workflow,

            eventData,

            "updateInventory"

        );

        // Don't approve if remaining automation failed
        if (!result.success) {

            return res.status(400).json({

                message: "Order approval failed because workflow execution was unsuccessful.",

                executionId: result.executionId

            });

        }

        // Everything succeeded → approve the order
        order.status = "confirmed";
        order.approvalStatus = "approved";

        await order.save();

        res.status(200).json({

            message: "Order approved successfully",

            order,

            executionId: result.executionId

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getOrders,

    getOrderById,
 
    approveOrder,

    rejectOrder

};