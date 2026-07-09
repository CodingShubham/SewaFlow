const Product = require("../Model/Product");

const validateBusinessRules = async (input) => {

    const items = input.items || [];

    for (const item of items) {

        const product = await Product.findOne({
            userId: input.userId,
            name: {
                $regex: new RegExp(`^${item.name}$`, "i")
            }
        });

        // Product doesn't exist
        if (!product) {

            return {
                shouldContinue: false,
                reason: `${item.name} is not available in inventory`
            };

        }

        // Invalid quantity
        if (item.qty <= 0) {

            return {
                shouldContinue: false,
                reason: `Invalid quantity for ${item.name}`
            };

        }

        // Stock unavailable
        if (product.stock < item.qty) {

            return {
                shouldContinue: false,
                reason: `${product.name} is out of stock`
            };

        }

    }

    return {
        shouldContinue: true
    };

};

module.exports = {
    validateBusinessRules
};