const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    sku: {
        type: String,
        default: ""
    },

    category: {
        type: String,
        default: "General"
    },

    description: {
        type: String,
        default: ""
    },

    price: {
        type: Number,
        required: true,
        default: 0
    },

    stock: {
        type: Number,
        default: 0
    },

    unit: {
        type: String,
        default: ""
    },

    lowStockThreshold: {
        type: Number,
        default: 10
    },

    image: {
        type: String,
        default: ""
    },

    active: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);