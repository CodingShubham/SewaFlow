const express = require('express');
const router = express.Router();
const authUser = require('../Middlewares/authMiddleware');
const Inventory = require('../Model/Inventory');

router.get('/', authUser, async (req, res) => {
    try {
        const items = await Inventory.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', authUser, async (req, res) => {
    try {
        const { itemName, quantity, unit, pricePerUnit, lowStockThreshold } = req.body;
        const item = await Inventory.create({
            userId: req.user._id,
            itemName,
            quantity,
            unit,
            pricePerUnit,
            lowStockThreshold
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', authUser, async (req, res) => {
    try {
        const item = await Inventory.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;