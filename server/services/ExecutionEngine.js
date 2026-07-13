const Execution = require("../Model/Execution");
const functionRegistry = require("./FunctionRegistry");
const orderStateService = require("./orderStateService");
const Order = require("../Model/Order");

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

    console.log("==================================");
    console.log("Workflow:", workflow.name);
    console.log("Workflow Steps:", workflow.steps);
    console.log("Executing Steps:", stepsToExecute);
    console.log("==================================");

    for (const stepName of stepsToExecute) {

        console.log(`\nRunning Step -> ${stepName}`);


        const policy = workflow.config || {};

/*
|--------------------------------------------------------------------------
| Inventory
|--------------------------------------------------------------------------
*/

if (
    stepName === "updateInventory" &&
    policy.outOfStockBehaviour === "none"
) {
    console.log("Skipping Inventory Update");
    continue;
}

/*
|--------------------------------------------------------------------------
| Invoice
|--------------------------------------------------------------------------
*/

if (
    stepName === "generateInvoice" &&
    policy.invoiceMode !== "automatic"
) {
    console.log("Skipping Invoice Generation");
    continue;
}

/*
|--------------------------------------------------------------------------
| Customer Notification
|--------------------------------------------------------------------------
*/

if (
    stepName === "notifyCustomer" &&
    policy.notificationsEnabled === false
) {
    console.log("Skipping Customer Notification");
    continue;
}


        execution.currentStep = stepName;
        await execution.save();

        const stepFunction = functionRegistry[stepName];

        if (!stepFunction) {

            console.log("Function not found:", stepName);

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

            console.log("Input:", currentInput);

            const startTime = Date.now();

            const output = await stepFunction(currentInput);

                if (
                stepName === "createOrder" &&
                workflow.config?.approvalMode === "automatic"
            ) {
                 const order = await Order.findById(output.orderId);
                await orderStateService.confirmOrder(
                    order,
                    "system"
                );
            }

            console.log("Output:", output);

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

    if (
    stepName === "createOrder" &&
    workflow.config?.approvalMode === "manual"
) {

    console.log("Manual approval workflow.");
    console.log("Waiting for business approval...");

    execution.status = "waiting";

    execution.currentStep = null;

    execution.finishedAt = new Date();

    await execution.save();

    return {

        success: true,

        waitingApproval: true,

        orderId: currentInput.orderId,

        executionId: execution._id

    };

}

            if (output?.shouldContinue === false) {

                console.log("Workflow stopped:", output.reason);

                execution.logs.push({
                    step: stepName,
                    status: "stopped",
                    output
                });

                execution.status = "stopped";
                execution.currentStep = null;
                execution.finishedAt = new Date();

                await execution.save();

                return {
                    success: false,
                    stopped: true,
                    reason: output.reason,
                    executionId: execution._id
                };

            }

        } catch (error) {

            console.log("Step Failed:", stepName);
            console.log(error);

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

    console.log("Workflow Completed Successfully");

    return {
        success: true,
        executionId: execution._id
    };

};

module.exports = executeWorkflow;