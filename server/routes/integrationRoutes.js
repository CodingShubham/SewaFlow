const express = require("express");
const router = express.Router();
const authUser = require("../Middlewares/authMiddleware");
const {
    createIntegration,
    getIntegrations,
    getIntegrationById,
    updateIntegration,
    deleteIntegration,
    connectIntegration,
    disconnectIntegration
} = require("../Controllers/integrationController");

router.post("/", authUser, createIntegration);
router.get("/", authUser, getIntegrations);
router.get("/:id", authUser, getIntegrationById);
router.put("/:id", authUser, updateIntegration);
router.delete("/:id", authUser, deleteIntegration);
router.patch("/:id/connect", authUser, connectIntegration);
router.patch("/:id/disconnect", authUser, disconnectIntegration);

module.exports = router;