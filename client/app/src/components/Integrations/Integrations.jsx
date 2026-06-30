import { useEffect, useState } from "react";
import ConnectModal from "../../components/integrations/ConnectModal";
import {
    MessageCircle,
    Mail,
    CreditCard,
    ShoppingBag,
    ArrowLeft
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import IntegrationCard from "../../components/integrations/IntegrationCard";


import {
    getIntegrations,
    createIntegration
} from "../../services/integrationService";

const Integrations = () => {

    const navigate = useNavigate();

    const [integrations, setIntegrations] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedIntegration, setSelectedIntegration] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const integrationTemplates = [

        {
            type: "whatsapp",
            title: "WhatsApp Business",
            description:
                "Receive customer orders directly from WhatsApp.",
            icon: MessageCircle,
            gradient:
                "from-green-500 to-emerald-600"
        },

        {
            type: "gmail",
            title: "Gmail",
            description:
                "Automatically send emails and notifications.",
            icon: Mail,
            gradient:
                "from-red-500 to-orange-500",
            comingSoon: true
        },

        {
            type: "razorpay",
            title: "Razorpay",
            description:
                "Accept online payments securely.",
            icon: CreditCard,
            gradient:
                "from-blue-500 to-cyan-500",
            comingSoon: true
        },

        {
            type: "shopify",
            title: "Shopify",
            description:
                "Sync orders and products automatically.",
            icon: ShoppingBag,
            gradient:
                "from-purple-500 to-indigo-600",
            comingSoon: true
        }

    ];

    useEffect(() => {

        loadIntegrations();

    }, []);

    const loadIntegrations = async () => {

        try {

            const data = await getIntegrations();

            setIntegrations(data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    const getIntegration = (type) => {

        return integrations.find(
            (i) => i.type === type
        );

    };

    return (

        <div className="min-h-screen bg-[#0F172A]">

            <div className="max-w-7xl mx-auto px-8 py-10">

                {/* HEADER */}

                <div className="flex items-center justify-between mb-12">

                    <div>

                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-6"
                        >
                            <ArrowLeft size={18} />

                            Back

                        </button>

                        <h1 className="text-5xl font-bold text-white">

                            Integrations

                        </h1>

                        <p className="text-slate-400 mt-3 text-lg">

                            Connect your favourite business tools to automate everything.

                        </p>

                    </div>

                    <div className="hidden lg:flex">

                        <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4">

                            <p className="text-slate-500 text-sm">

                                Connected

                            </p>

                            <h2 className="text-3xl font-bold text-white">

                                {

                                    integrations.filter(
                                        i => i.status === "connected"
                                    ).length

                                }

                            </h2>

                        </div>

                    </div>

                </div>

                {/* GRID */}

                {

                    loading ?

                        <div className="text-center text-slate-400 py-24">

                            Loading Integrations...

                        </div>

                        :

                        <div className="grid xl:grid-cols-2 gap-8">

                            {

                                integrationTemplates.map((item) => (

                                    <IntegrationCard

                                        key={item.type}

                                        template={item}

                                        integration={getIntegration(item.type)}

                                       onConnect={async () => {

    let existing = getIntegration(item.type);

    try {

        if (!existing) {

            existing = await createIntegration({

                type: item.type,

                credentials: {}

            });

            await loadIntegrations();

        }

        setSelectedIntegration(existing);

        setShowModal(true);

    }

    catch (err) {

        console.log(err);

        alert("Unable to create integration.");

    }

}}

                                        refresh={loadIntegrations}

                                    />

                                ))

                            }

                        </div>

                }

            </div>

            {

                showModal && (

                    <ConnectModal

                        integration={selectedIntegration}

                        close={() => setShowModal(false)}

                        refresh={loadIntegrations}

                    />

                )

            }

        </div>

    );

};

export default Integrations;