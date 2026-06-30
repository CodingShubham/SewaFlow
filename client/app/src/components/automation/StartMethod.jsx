const methods = [
    {
        id: "template",
        icon: "🧩",
        title: "Ready-Made Automation",
        description:
            "Choose from professionally built automation templates.",
        recommended: true,
        enabled: true,
    },
    {
        id: "ai",
        icon: "🤖",
        title: "Describe What You Want",
        description:
            "Tell AI what you want to automate using natural language.",
        recommended: false,
        enabled: false,
    },
    {
        id: "custom",
        icon: "⚙️",
        title: "Build Custom Workflow",
        description:
            "Create your automation from scratch using triggers and actions.",
        recommended: false,
        enabled: false,
    },
];

const StartMethod = ({ selected, onSelect }) => {
    return (
        <div>

            <h2 className="text-3xl font-bold text-white">
                How would you like to start?
            </h2>

            <p className="text-slate-400 mt-2">
                Choose the best way to create your automation.
            </p>

            <div className="grid lg:grid-cols-3 gap-6 mt-10">

                {methods.map((method) => (

                    <div
                        key={method.id}
                        onClick={() => {
                            if (method.enabled) {
                                onSelect(method);
                            }
                        }}
                        className={`
                            relative
                            rounded-2xl
                            border
                            p-6
                            transition-all
                            cursor-pointer

                            ${
                                selected?.id === method.id
                                    ? "border-blue-500 bg-blue-500/10"
                                    : "border-slate-800 bg-[#111827]"
                            }

                            ${
                                !method.enabled
                                    ? "opacity-60 cursor-not-allowed"
                                    : "hover:border-blue-500 hover:-translate-y-1"
                            }
                        `}
                    >

                        {method.recommended && (

                            <span className="absolute top-4 right-4 bg-blue-600 text-xs text-white px-3 py-1 rounded-full">
                                Recommended
                            </span>

                        )}

                        <div className="text-5xl">
                            {method.icon}
                        </div>

                        <h3 className="text-xl font-semibold text-white mt-6">
                            {method.title}
                        </h3>

                        <p className="text-slate-400 mt-3 leading-7">
                            {method.description}
                        </p>

                        {!method.enabled && (

                            <div className="mt-8">

                                <span className="bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-full">
                                    Coming Soon
                                </span>

                            </div>

                        )}

                    </div>

                ))}

            </div>

        </div>
    );
};

export default StartMethod;