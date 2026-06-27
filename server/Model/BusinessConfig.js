const mongoose = require("mongoose");

const businessConfigSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    businessName: {
        type: String,
        required: true,
        trim: true
    },

    industry: {
        type: String,
        required: true
    },

    currency: {
        type: String,
        default: "INR"
    },

    timezone: {
        type: String,
        default: "Asia/Kolkata"
    },

    setupComplete: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("BusinessConfig", businessConfigSchema);