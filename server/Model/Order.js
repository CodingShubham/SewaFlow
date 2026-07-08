const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },

        name: {
            type: String,
            required: true
        },

        qty: {
            type: Number,
            required: true
        },

        unit: {
            type: String,
            default: "pcs"
        },

        price: {
            type: Number,
            default: 0
        },

        total: {
            type: Number,
            default: 0
        }
    },
    {
        _id: false
    }
);

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },

        workflowId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workflow"
        },

        source: {
            type: String,
            enum: [
                "whatsapp",
                "instagram",
                "telegram",
                "website",
                "api"
            ],
            default: "whatsapp"
        },

        items: [orderItemSchema],

        totalAmount: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "processing",
                "completed",
                "cancelled"
            ],
            default: "pending"
        },

        approvalStatus: {
            type: String,
            enum: [
                "pending",
                "approved",
                "rejected"
            ],
            default: "pending"
        },

        notes: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);