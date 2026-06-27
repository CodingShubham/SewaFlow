const Integration = require("../Model/Integrations");

const createIntegration = async (req, res) => {
    try {
        const { type, credentials } = req.body;

        const existing = await Integration.findOne({
            userId: req.user._id,
            type
        });

        if (existing) {
            return res.status(400).json({ message: `${type} integration already exists` });
        }

        const integration = await Integration.create({
            userId: req.user._id,
            type,
            credentials,
            status: "disconnected"
        });

        res.status(201).json(integration);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getIntegrations = async (req, res) => {
    try {
        const integrations = await Integration.find({ userId: req.user._id });
        res.status(200).json(integrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getIntegrationById = async (req, res) => {
    try {
        const integration = await Integration.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!integration) {
            return res.status(404).json({ message: "Integration not found" });
        }

        res.status(200).json(integration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateIntegration = async (req, res) => {
    try {
        const integration = await Integration.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );

        if (!integration) {
            return res.status(404).json({ message: "Integration not found" });
        }

        res.status(200).json(integration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteIntegration = async (req, res) => {
    try {
        const integration = await Integration.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!integration) {
            return res.status(404).json({ message: "Integration not found" });
        }

        res.status(200).json({ message: "Integration deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const connectIntegration = async (req, res) => {
    try {
        const integration = await Integration.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            {
                status: "connected",
                credentials: { ...req.body.credentials }
            },
            { new: true }
        );

        if (!integration) {
            return res.status(404).json({ message: "Integration not found" });
        }

        res.status(200).json(integration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const disconnectIntegration = async (req, res) => {
    try {
        const integration = await Integration.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            {
                status: "disconnected",
                credentials: {}
            },
            { new: true }
        );

        if (!integration) {
            return res.status(404).json({ message: "Integration not found" });
        }

        res.status(200).json(integration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createIntegration,
    getIntegrations,
    getIntegrationById,
    updateIntegration,
    deleteIntegration,
    connectIntegration,
    disconnectIntegration
};