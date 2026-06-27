const mongoose = require("mongoose");

const workflowSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    businessConfigId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessConfig",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    trigger: {
        type: String,
        required: true
    },

    steps: [{
        type: String,
        required: true
    }],

    template: {
        type: String,
        default: "custom"
    },

    config: {

        dataSource: {
            type: String,
            enum: ["manual", "excel", "google_sheets", "database"],
            default: "manual"
        },

        outOfStockBehaviour: {
            type: String,
            enum: ["reject", "pending", "notify"],
            default: "notify"
        },

        invoiceMode: {
            type: String,
            enum: ["automatic", "manual"],
            default: "automatic"
        },

        notificationsEnabled: {
            type: Boolean,
            default: true
        }

    },

    isActive: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model("Workflow", workflowSchema);