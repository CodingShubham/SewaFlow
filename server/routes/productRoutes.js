const express = require("express");
const router = express.Router();
const authUser = require("../Middlewares/authMiddleware");
const Product = require("../Model/Product");

// Get all products
router.get("/", authUser, async (req, res) => {
    try {
        const products = await Product.find({
            userId: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create product
router.post("/", authUser, async (req, res) => {
    try {

        const {
            name,
            sku,
            category,
            description,
            price,
            stock,
            unit,
            lowStockThreshold,
            image,
            active
        } = req.body;

        const product = await Product.create({
            userId: req.user._id,
            name,
            sku,
            category,
            description,
            price,
            stock,
            unit,
            lowStockThreshold,
            image,
            active
        });

        res.status(201).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update product
router.put("/:id", authUser, async (req, res) => {
    try {

        const product = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user._id
            },
            req.body,
            {
                new: true
            }
        );

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete product
router.delete("/:id", authUser, async (req, res) => {
    try {

        await Product.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;