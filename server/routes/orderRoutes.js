const express = require("express");

const router = express.Router();

const authMiddleware = require("../Middlewares/authMiddleware");

const {

    getOrders,

    getOrderById,

    getOrderStats,

    approveOrder,

    rejectOrder,

    startProcessing,

    completeOrder

} = require("../Controllers/orderController");

router.get(

    "/",

    authMiddleware,

    getOrders

);


router.get(

    "/stats",

    authMiddleware,

    getOrderStats

);


router.get(

    "/:id",

    authMiddleware,

    getOrderById

);

router.put(

    "/:id/approve",

    authMiddleware,

    approveOrder

);

router.put(

    "/:id/reject",

    authMiddleware,

    rejectOrder

);


router.put(

    "/:id/processing",

    authMiddleware,

   startProcessing

);

router.put(

    "/:id/complete",

    authMiddleware,

   completeOrder

);


module.exports = router;