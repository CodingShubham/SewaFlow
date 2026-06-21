const express = require("express");
const router = express.Router();
const authUser = require("../Middlewares/authMiddleware");
const { getExecutions, getExecutionById } = require("../Controllers/executionController");

router.get("/", authUser, getExecutions);
router.get("/:id", authUser, getExecutionById);

module.exports = router;