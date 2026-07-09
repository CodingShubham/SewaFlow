const express = require("express");

const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");

const {

    getOrders,

    getOrderById,
  
    approveOrder,

    rejectOrder

} = require("../Controller/orderController");

router.get(

    "/",

    authMiddleware,

    getOrders

);

router.get(

    "/:id",

    authMiddleware,

    getOrderById

);

router.patch(

    "/:id/approve",

    authMiddleware,

    approveOrder

);

router.patch(

    "/:id/reject",

    authMiddleware,

    rejectOrder

);

module.exports = router;