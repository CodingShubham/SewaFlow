const Product = require("../Model/Product");
const DataSource = require("../Model/Product");

const getProducts = async (userId) => {

    // Find user's selected data source
    const source = await DataSource.findOne({ userId });

    // Default to manual database
    const sourceType = source?.type || "manual";

    switch (sourceType) {

        case "manual":

            return await Product.find({
                userId,
                active: true
            }).sort({ createdAt: -1 });

        case "googleSheets":

            throw new Error("Google Sheets provider not implemented.");

        case "excel":

            throw new Error("Excel provider not implemented.");

        case "shopify":

            throw new Error("Shopify provider not implemented.");

        case "api":

            throw new Error("Custom API provider not implemented.");

        default:

            throw new Error("Unknown data source.");

    }

};


const getProductByName = async (userId, productName) => {

    const source = await DataSource.findOne({ userId });

    const sourceType = source?.type || "manual";

    switch (sourceType) {

        case "manual":

            return await Product.findOne({
                userId,
                active: true,
                name: {
                    $regex: new RegExp(productName, "i")
                }
            });

        case "googleSheets":

            throw new Error("Google Sheets provider not implemented.");

        case "excel":

            throw new Error("Excel provider not implemented.");

        case "shopify":

            throw new Error("Shopify provider not implemented.");

        case "api":

            throw new Error("Custom API provider not implemented.");

        default:

            throw new Error("Unknown data source.");

    }

};


module.exports = {
    getProducts,
    getProductByName
};