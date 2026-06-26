const express = require('express');
const router = express.Router();
const authUser = require('../Middlewares/authMiddleware');
const Customer = require('../Model/Customer');

router.get('/', authUser, async (req, res) => {
    try {
        const customers = await Customer.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;