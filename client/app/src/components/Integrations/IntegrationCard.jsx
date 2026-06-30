import {
    CheckCircle2,
    PlugZap,
    Clock3,
    Trash2
} from "lucide-react";

import {
    disconnectIntegration
} from "../../services/integrationService";

const IntegrationCard = ({
    template,
    integration,
    onConnect,
    refresh
}) => {

    const Icon = template.icon;

    const connected =
        integration?.status === "connected";

    const handleDisconnect = async () => {

        try {

            await disconnectIntegration(integration._id);

            refresh();

        }

        catch (err) {

            console.log(err);

            alert("Unable to disconnect.");

        }

    };

    return (

        <div
            className="
            group
            bg-[#111827]
            border
            border-slate-800
            rounded-3xl
            p-8
            hover:border-blue-500
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]
        "
        >

            {/* Header */}

            <div className="flex justify-between items-start">

                <div
                    className={`
                        h-16
                        w-16
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        bg-gradient-to-r
                        ${template.gradient}
                        shadow-lg
                    `}
                >

                    <Icon
                        className="text-white"
                        size={30}
                    />

                </div>

                {

                    template.comingSoon ?

                        <span
                            className="
                                px-3
                                py-1
                                rounded-full
                                bg-yellow-500/20
                                text-yellow-300
                                text-xs
                                font-semibold
                            "
                        >
                            Coming Soon
                        </span>

                        :

                        connected ?

                            <span
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    px-3
                                    py-1
                                    rounded-full
                                    bg-green-500/20
                                    text-green-400
                                    text-xs
                                    font-semibold
                                "
                            >

                                <CheckCircle2 size={14} />

                                Connected

                            </span>

                            :

                            <span
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    px-3
                                    py-1
                                    rounded-full
                                    bg-slate-700
                                    text-slate-300
                                    text-xs
                                "
                            >

                                <Clock3 size={14} />

                                Not Connected

                            </span>

                }

            </div>

            {/* Body */}

            <div className="mt-8">

                <h2 className="text-2xl font-bold text-white">

                    {template.title}

                </h2>

                <p className="text-slate-400 mt-3 leading-7">

                    {template.description}

                </p>

            </div>

            {

                connected && integration && (

                    <div
                        className="
                            mt-6
                            bg-slate-900
                            rounded-xl
                            border
                            border-slate-800
                            p-4
                        "
                    >

                        <p className="text-xs text-slate-500">

                            Connected Account

                        </p>

                        <p className="text-white mt-2 break-all">

                            {

                                integration.credentials
                                    ?.phoneNumberId ||

                                integration.credentials
                                    ?.email ||

                                "Connected"

                            }

                        </p>

                    </div>

                )

            }

            {/* Footer */}

            <div className="mt-8">

                {

                    template.comingSoon ?

                        <button
                            disabled
                            className="
                                w-full
                                py-3
                                rounded-xl
                                bg-slate-800
                                text-slate-500
                                cursor-not-allowed
                            "
                        >

                            Coming Soon

                        </button>

                        :

                        connected ?

                            <button

                                onClick={handleDisconnect}

                                className="
                                    w-full
                                    flex
                                    justify-center
                                    items-center
                                    gap-3
                                    py-3
                                    rounded-xl
                                    bg-red-500/20
                                    text-red-400
                                    hover:bg-red-500
                                    hover:text-white
                                    transition-all
                                "
                            >

                                <Trash2 size={18} />

                                Disconnect

                            </button>

                            :

                            <button

                                onClick={onConnect}

                                className="
                                    w-full
                                    flex
                                    justify-center
                                    items-center
                                    gap-3
                                    py-3
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-blue-600
                                    to-indigo-600
                                    hover:from-blue-500
                                    hover:to-indigo-500
                                    text-white
                                    transition-all
                                "
                            >

                                <PlugZap size={18} />

                                Connect

                            </button>

                }

            </div>

        </div>

    );

};

export default IntegrationCard;