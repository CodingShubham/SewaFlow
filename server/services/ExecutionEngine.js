const Execution = require("../Model/Execution");
const functionRegistry = require("./functionRegistry");

const executeWorkflow = async (workflow, eventData) => {

    const execution = await Execution.create({
        workflowId: workflow._id,
        businessConfigId: workflow.businessConfigId,
        userId: workflow.userId,
        status: "running"
    });

    let currentInput = {
    workflow,
    userId: workflow.userId,
    ...eventData
};

    for (const stepName of workflow.steps) {

        execution.currentStep = stepName;
        await execution.save();

        const stepFunction = functionRegistry[stepName];

        if (!stepFunction) {
            execution.logs.push({
                step: stepName,
                status: "failed",
                error: "Function not found in registry"
            });

            execution.status = "failed";
            execution.finishedAt = new Date();

            await execution.save();

            return {
                success: false,
                executionId: execution._id
            };
        }

        try {

            const startTime = Date.now();

            const output = await stepFunction(currentInput);

            const durationMs = Date.now() - startTime;

            execution.logs.push({
                step: stepName,
                status: "success",
                input: currentInput,
                output,
                durationMs
            });

            await execution.save();

            currentInput = {
                ...currentInput,
                ...output
            };

        } catch (error) {

            execution.logs.push({
                step: stepName,
                status: "failed",
                error: error.message
            });

            execution.status = "failed";
            execution.finishedAt = new Date();

            await execution.save();

            return {
                success: false,
                executionId: execution._id
            };
        }
    }

    execution.status = "success";
    execution.currentStep = null;
    execution.finishedAt = new Date();

    await execution.save();

    return {
        success: true,
        executionId: execution._id
    };
};

module.exports = executeWorkflow;