const Execution = require("../Model/Execution");
const functionRegistry = require("./FunctionRegistry");

const executeWorkflow = async (workflow, eventData, startFromStep = null) => {

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

    let stepsToExecute = workflow.steps;

    if (startFromStep) {

    const index = workflow.steps.indexOf(startFromStep);

    if (index >= 0) {

        stepsToExecute = workflow.steps.slice(index);

    }

}

    for (const stepName of stepsToExecute) {

// Read workflow automation policies
const policy = workflow.config || {};

// Skip inventory update
if (
    stepName === "updateInventory" &&
    policy.inventoryUpdate !== "on_confirmation"
) {
    console.log("Skipping Inventory Update");
    continue;
}

// Skip invoice generation
if (
    stepName === "generateInvoice" &&
    policy.invoiceGeneration !== "on_confirmation"
) {
    console.log("Skipping Invoice Generation");
    continue;
}

// Skip customer notification
if (
    stepName === "notifyCustomer" &&
    policy.customerNotification === false
) {
    console.log("Skipping Customer Notification");
    continue;
}
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


            if (output?.shouldContinue === false) {

    execution.logs.push({
        step: stepName,
        status: "stopped",
        output
    });

    execution.status = "stopped";
    execution.currentStep = null;
    execution.finishedAt = new Date();

    await execution.save();

    console.log("Workflow stopped:", output.reason);

    return {
        success: false,
        stopped: true,
        reason: output.reason,
        executionId: execution._id
    };

}

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