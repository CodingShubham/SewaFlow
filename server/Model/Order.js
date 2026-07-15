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

    pricePerUnit: {
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

const orderTimelineSchema = new mongoose.Schema(
{
    event: {
        type: String,
        required: true
    },

    by: {
        type: String,
        default: "system"
    },

    note: {
        type: String,
        default: ""
    },

    at: {
        type: Date,
        default: Date.now
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

    orderNumber: {
        type: String,
        unique: true
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

    customerMessage: {

    text: {
        type: String,
        default: ""
    },

    type: {
        type: String,
        enum: [
            "text",
            "image",
            "audio",
            "document",
            "interactive"
        ],
        default: "text"
    }

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
            "rejected",
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

    paymentStatus: {
        type: String,
        enum: [
            "pending",
            "paid",
            "failed"
        ],
        default: "pending"
    },

    inventoryReserved: {
        type: Boolean,
        default: false
    },

    invoiceGenerated: {
        type: Boolean,
        default: false
    },

    timeline: [orderTimelineSchema],

    notes: {
        type: String,
        default: ""
    }

},


{
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);