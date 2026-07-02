const ReviewStep = ({
    template,
    integrations,
    configuration
}) => {

    const workflowSteps = [
        "Customer Order",
        "AI Processing",
        "Customer",
        "Inventory",
        "Invoice",
        "Notification"
    ];

    return (

        <div className="space-y-6">

            {/* Automation */}

            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">

                <h2 className="text-2xl font-semibold text-white">
                    Automation
                </h2>

                <div className="mt-6">

                    <h3 className="text-xl font-semibold text-white">
                        {template?.name}
                    </h3>

                    <p className="text-slate-400 mt-2">
                        {template?.description}
                    </p>

                </div>

            </div>

            {/* Connected Integrations */}

            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">

                <h2 className="text-2xl font-semibold text-white">
                    Connected Integrations
                </h2>

                <div className="mt-6 space-y-3">

                    {integrations.map((integration) => (

                        <div
                            key={integration._id}
                            className="flex items-center justify-between rounded-xl bg-slate-900 border border-slate-800 px-5 py-4"
                        >

                            <span className="text-white capitalize">
                                {integration.type.replace("_", " ")}
                            </span>

                            <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400">
                                Connected
                            </span>

                        </div>

                    ))}

                </div>

            </div>

            {/* Configuration */}

            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">

                <h2 className="text-2xl font-semibold text-white">
                    Configuration
                </h2>

                <div className="mt-6 grid md:grid-cols-2 gap-5">

                    <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">

                        <p className="text-sm text-slate-400">
                            Order Approval
                        </p>

                        <p className="mt-2 text-white font-medium capitalize">
                            {configuration.approvalMode}
                        </p>

                    </div>

                    <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">

                        <p className="text-sm text-slate-400">
                            Out of Stock
                        </p>

                        <p className="mt-2 text-white font-medium capitalize">
                            {configuration.outOfStockBehaviour}
                        </p>

                    </div>

                    <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">

                        <p className="text-sm text-slate-400">
                            Invoice
                        </p>

                        <p className="mt-2 text-white font-medium capitalize">
                            {configuration.invoiceMode}
                        </p>

                    </div>

                    <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">

                        <p className="text-sm text-slate-400">
                            Customer Notifications
                        </p>

                        <p className="mt-2 text-white font-medium">
                            {configuration.notificationsEnabled
                                ? "Enabled"
                                : "Disabled"}
                        </p>

                    </div>

                </div>

            </div>

            {/* Workflow */}

            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">

                <h2 className="text-2xl font-semibold text-white">
                    Automation Workflow
                </h2>

                <p className="text-slate-400 mt-2">
                    After activation, your automation will execute these steps automatically.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">

                    {workflowSteps.map((step, index) => (

                        <div
                            key={step}
                            className="flex items-center"
                        >

                            <div className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-5 min-w-[170px] text-center">

                                <div className="text-xs uppercase tracking-wider text-slate-500">

                                    Step {index + 1}

                                </div>

                                <div className="mt-2 text-white font-medium">

                                    {step}

                                </div>

                            </div>

                            {index !== workflowSteps.length - 1 && (

                                <div className="mx-3 text-slate-500 text-2xl">

                                    →

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

};

export default ReviewStep;