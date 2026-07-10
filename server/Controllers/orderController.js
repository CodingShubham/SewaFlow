const Order = require("../Model/Order");
const Workflow = require("../Model/WorkFlow");
const executeWorkflow = require("../services/executionEngine");
const Customer = require("../Model/Customer");
const Integration = require("../Model/Integrations");


const getOrders = async (req, res) => {

    try {

        console.log("Logged-in user:", req.user._id);

        const orders = await Order.find({

            userId: req.user._id

        })

        .populate("customerId")

        .sort({

            createdAt: -1

        });

        
        console.log("Orders found:", orders);

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

                message: "Order already approved"

            });

        }

        const workflow = await Workflow.findById(order.workflowId);

        if (!workflow) {

            return res.status(404).json({

                message: "Workflow not found"

            });

        }

        const customer = await Customer.findById(order.customerId);

        if (!customer) {

            return res.status(404).json({

                message: "Customer not found"

            });

        }

        const integration = await Integration.findOne({

            userId: order.userId

        });

        if (!integration) {

            return res.status(404).json({

                message: "WhatsApp integration not found"

            });

        }

        const eventData = {

            workflow,

            userId: order.userId,

            customerId: order.customerId,

            customerPhone: customer.phone,

            integration,

            order

        };

        const result = await executeWorkflow(

            workflow,

            eventData,

            "updateInventory"

        );

        console.log(result);

        if (!result.success) {

            return res.status(400).json({

                message: "Order approval failed because workflow execution was unsuccessful.",

                executionId: result.executionId

            });

        }

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

        console.error(error);

        res.status(500).json({

            message: error.message

        });

    }

};


const getOrderStats = async (req, res) => {

    try {

        const userId = req.user._id;

        const [
            totalOrders,
            pendingOrders,
            approvedOrders,
            rejectedOrders,
            revenue
        ] = await Promise.all([

            Order.countDocuments({ userId }),

            Order.countDocuments({
                userId,
                approvalStatus: "pending"
            }),

            Order.countDocuments({
                userId,
                approvalStatus: "approved"
            }),

            Order.countDocuments({
                userId,
                approvalStatus: "rejected"
            }),

            Order.aggregate([
                {
                    $match: {
                        userId
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$totalAmount"
                        }
                    }
                }
            ])

        ]);

        res.json({

            totalOrders,

            pendingOrders,

            approvedOrders,

            rejectedOrders,

            revenue: revenue[0]?.total || 0

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

    getOrderStats,
    
    approveOrder,

    rejectOrder

};