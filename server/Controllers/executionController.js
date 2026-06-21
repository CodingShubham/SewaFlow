const Execution = require("../Model/Execution");

const getExecutions = async (req, res) => {
    try {
        const executions = await Execution.find({ userId: req.user._id })
            .sort({ startedAt: -1 });
        res.status(200).json(executions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getExecutionById = async (req, res) => {
    try {
        const execution = await Execution.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!execution) {
            return res.status(404).json({ message: "Execution not found" });
        }
        res.status(200).json(execution);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getExecutions, getExecutionById };