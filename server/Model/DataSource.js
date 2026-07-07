const mongoose = require("mongoose");

const dataSourceSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    type: {
        type: String,
        enum: ["manual", "googleSheets", "excel", "shopify", "api"],
        default: "manual"
    },

    status: {
        type: String,
        enum: ["connected", "disconnected"],
        default: "connected"
    },

    configuration: {
        type: Object,
        default: {}
    },

    lastSynced: {
        type: Date
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("DataSource", dataSourceSchema);