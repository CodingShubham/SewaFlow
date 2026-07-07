const express = require("express");
const router = express.Router();
const Product = require("../Model/Product");
const authUser = require("../Middlewares/authMiddleware");
const DataSource = require("../Model/DataSource");


// Get current data source
router.get("/", authUser, async (req, res) => {
    try {

        let dataSource = await DataSource.findOne({
            userId: req.user._id
        });

        if (!dataSource) {

            dataSource = await DataSource.create({
                userId: req.user._id,
                type: "manual",
                status: "connected"
            });

        }

        // Count user's products
        const productCount = await Product.countDocuments({
            userId: req.user._id
        });

        res.status(200).json({
            ...dataSource.toObject(),
            productCount
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


// Update data source
router.put("/", authUser, async (req, res) => {

    try {

        const { type, configuration } = req.body;

        const dataSource = await DataSource.findOneAndUpdate(

            {
                userId: req.user._id
            },

            {
                type,
                configuration,
                status: "connected"
            },

            {
                new: true,
                upsert: true
            }

        );

        res.status(200).json(dataSource);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;