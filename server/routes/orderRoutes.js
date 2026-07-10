const express = require("express");

const router = express.Router();

const authMiddleware = require("../Middlewares/authMiddleware");

const {

    getOrders,

    getOrderStats,

    getOrderById,
  
    approveOrder,

    rejectOrder

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



module.exports = router;