const express=require("express");
const router=express.Router();

const { createBusinessConfig,getBusinessConfig, updateBusinessConfig} = require("../Controllers/businessConfigController");

const authMiddleware = require("../Middlewares/authMiddleware");

// Create Business Configuration
router.post("/", authMiddleware, createBusinessConfig);

// Get Logged-in User Business Configuration
router.get("/", authMiddleware, getBusinessConfig);

// Update Logged-in User Business Configuration
router.put("/", authMiddleware, updateBusinessConfig);

module.exports = router;