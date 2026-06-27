const mongoose = require("mongoose");

const integrationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    type: {
        type: String,
        required: true,
        enum: [
            "whatsapp",
            "google_sheets",
            "excel",
            "shopify",
            "woocommerce",
            "tiktok",
            "instagram",
            "email"
        ]
    },

    status: {
        type: String,
        enum: ["connected", "disconnected"],
        default: "disconnected"
    },

    credentials: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Integration", integrationSchema);