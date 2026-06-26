const express = require('express');
const router = express.Router();
const authUser = require('../Middlewares/authMiddleware');
const Invoice = require('../Model/Invoice');

router.get('/', authUser, async (req, res) => {
    try {
        const invoices = await Invoice.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;