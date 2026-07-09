import { useEffect, useState } from "react";

const WhatsAppOrderConfiguration = ({
    value,
    onChange
}) => {


    const [config, setConfig] = useState({

    approvalMode: "automatic",

    outOfStockBehaviour: "notify",

    inventoryUpdate: "on_confirmation",

    invoiceGeneration: "on_confirmation",

    customerNotification: true,

    ...value

});

    useEffect(() => {

        onChange(config);

    }, [config]);

    return (

        <div className="space-y-8">
<div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">

    <h2 className="text-2xl font-semibold text-white">
        Order Approval
    </h2>

    <p className="text-slate-400 mt-2">
        Choose whether orders should be approved automatically or wait for manual review.
    </p>

    <div className="mt-8 space-y-5">

        <label className="flex items-start gap-3 text-white">

            <input
                type="radio"
                name="approval"
                checked={config.approvalMode === "automatic"}
                onChange={() =>
                    setConfig(prev => ({
                        ...prev,
                        approvalMode: "automatic"
                    }))
                }
            />

            <div>

                <p className="font-medium">
                    Automatic Approval
                </p>

                <p className="text-sm text-slate-400">
                    Orders are confirmed immediately and the automation continues automatically.
                </p>

            </div>

        </label>

        <label className="flex items-start gap-3 text-white">

            <input
                type="radio"
                name="approval"
                checked={config.approvalMode === "manual"}
                onChange={() =>
                    setConfig(prev => ({
                        ...prev,
                        approvalMode: "manual"
                    }))
                }
            />

            <div>

                <p className="font-medium">
                    Manual Approval
                </p>

                <p className="text-sm text-slate-400">
                    Orders remain pending until you approve them from the Orders page.
                </p>

            </div>

        </label>

    </div>

</div>


<div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">

    <h2 className="text-2xl font-semibold text-white">
        Inventory Update Policy
    </h2>

    <p className="text-slate-400 mt-2">
        Choose when inventory should be deducted for an order.
    </p>

    <div className="mt-8 space-y-5">

        <label className="flex items-start gap-3 text-white">

            <input
                type="radio"
                name="inventoryUpdate"
                checked={config.inventoryUpdate === "on_confirmation"}
                onChange={() =>
                    setConfig(prev => ({
                        ...prev,
                        inventoryUpdate: "on_confirmation"
                    }))
                }
            />

            <div>

                <p className="font-medium">
                    Update on Order Confirmation
                </p>

                <p className="text-sm text-slate-400">
                    Deduct stock immediately after the order is confirmed.
                </p>

            </div>

        </label>

        <label className="flex items-start gap-3 text-white">

            <input
                type="radio"
                name="inventoryUpdate"
                checked={config.inventoryUpdate === "on_completion"}
                onChange={() =>
                    setConfig(prev => ({
                        ...prev,
                        inventoryUpdate: "on_completion"
                    }))
                }
            />

            <div>

                <p className="font-medium">
                    Update on Order Completion
                </p>

                <p className="text-sm text-slate-400">
                    Deduct stock only after the order has been completed.
                </p>

            </div>

        </label>

    </div>

</div>


<div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">

    <h2 className="text-2xl font-semibold text-white">
        Invoice Generation
    </h2>

    <p className="text-slate-400 mt-2">
        Choose when invoices should be generated during the order lifecycle.
    </p>

    <div className="mt-8 space-y-5">

        <label className="flex items-start gap-3 text-white">

            <input
                type="radio"
                name="invoiceGeneration"
                checked={config.invoiceGeneration === "on_confirmation"}
                onChange={() =>
                    setConfig(prev => ({
                        ...prev,
                        invoiceGeneration: "on_confirmation"
                    }))
                }
            />

            <div>

                <p className="font-medium">
                    Generate on Order Confirmation
                </p>

                <p className="text-sm text-slate-400">
                    Invoice is generated immediately after the order is confirmed.
                </p>

            </div>

        </label>

        <label className="flex items-start gap-3 text-white">

            <input
                type="radio"
                name="invoiceGeneration"
                checked={config.invoiceGeneration === "on_completion"}
                onChange={() =>
                    setConfig(prev => ({
                        ...prev,
                        invoiceGeneration: "on_completion"
                    }))
                }
            />

            <div>

                <p className="font-medium">
                    Generate on Order Completion
                </p>

                <p className="text-sm text-slate-400">
                    Invoice is created only after the order is completed.
                </p>

            </div>

        </label>

    </div>

</div>

<div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">

    <div className="flex items-center justify-between">

        <div>

            <h2 className="text-2xl font-semibold text-white">
                Customer Notifications
            </h2>

            <p className="text-slate-400 mt-2">
                Automatically send a WhatsApp confirmation after a successful order.
            </p>

        </div>

        <label className="relative inline-flex cursor-pointer items-center">

            <input
                type="checkbox"
                className="peer sr-only"
                checked={config.customerNotification}
                onChange={(e) =>
                    setConfig(prev => ({
                        ...prev,
                        customerNotification: e.target.checked
                    }))
                }
            />

            <div className="peer h-6 w-11 rounded-full bg-slate-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-green-600 peer-checked:after:translate-x-full"></div>

        </label>

    </div>

    {config.customerNotification && (

        <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-6">

            <p className="text-sm uppercase tracking-wide text-slate-500 mb-4">

                Message Preview

            </p>

            <div className="rounded-xl bg-[#0F172A] border border-slate-700 p-5">

                <p className="text-white">
                    Hello John 👋
                </p>

                <p className="mt-4 text-slate-300">
                    Your order has been confirmed.
                </p>

                <div className="mt-5 text-slate-300 space-y-1">

                    <p>• Milk × 2</p>

                    <p>• Bread × 1</p>

                </div>

                <p className="mt-5 text-white font-semibold">
                    Total: ₹340
                </p>

                <p className="text-slate-300">
                    Invoice: INV-1023
                </p>

                <p className="mt-6 text-slate-400">
                    Thank you for shopping with us.
                </p>

            </div>

            <p className="mt-4 text-sm text-slate-500">

                This is a sample preview. Customer name, items,
                invoice number and total amount will be filled automatically.

            </p>

        </div>

    )}

</div>

        </div>

        

    );

};

export default WhatsAppOrderConfiguration;