const express = require("express");
const router = express.Router();
const authUser = require("../Middlewares/authMiddleware");
const executeWorkflow = require("../services/executionEngine");

router.post("/test-execute", authUser, async (req, res) => {
    try {
        const { trigger, eventData } = req.body;
        const result = await executeWorkflow(trigger, eventData, req.user._id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;