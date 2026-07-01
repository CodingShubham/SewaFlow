import { useEffect, useState } from "react";
import { getIntegrations,createIntegration} from "../../services/integrationService";
import ConnectModal from "./ConnectModal";

const IntegrationStep = ({ template, requiredIntegrations = [], onSuccess }) => {
    const [loading, setLoading] = useState(true);
    const [integrations, setIntegrations] = useState([]);
    const [connectedIntegrations, setConnectedIntegrations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedIntegration, setSelectedIntegration] = useState(null);

    useEffect(() => {

    if (requiredIntegrations.length) {

        loadIntegrations();

    }

    }, [requiredIntegrations]);


    useEffect(() => {
        console.log("Connected Integrations:", connectedIntegrations);
        if (onSuccess) {
            onSuccess(connectedIntegrations);
        }
    }, [connectedIntegrations]);


const loadIntegrations = async () => {

    try {

        setLoading(true);

        // Get existing integrations
        let existingIntegrations = await getIntegrations();

        // Loop through required integrations
        for (const type of requiredIntegrations) {

            const exists = existingIntegrations.find(
                integration => integration.type === type
            );

            if (!exists) {

                console.log(`Creating ${type} integration...`);

                await createIntegration({

                    type,

                });

            }

        }

        // Reload integrations after creating missing ones
        existingIntegrations = await getIntegrations();

        setIntegrations(existingIntegrations);

        setConnectedIntegrations(

            existingIntegrations.filter(

                integration => integration.status === "connected"

            )

        );

    }

    catch (error) {

        console.error(error);

    }

    finally {

        setLoading(false);

    }

};


    if (loading) {
        return (
            <div className="bg-[#111827] rounded-2xl p-8 text-white">
                Loading integrations...
            </div>
        );
    }

    const required = integrations.filter((integration) =>
        requiredIntegrations.includes(integration.type)
    );

    return (
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">

            <h2 className="text-2xl font-semibold text-white">
                Required Integrations
            </h2>

            <p className="text-slate-400 mt-2">
                Connect the required services for this automation.
            </p>

            <div className="mt-8 space-y-4">

                {required.map((integration) => (

                    <div
                        key={integration._id}
                        className="flex items-center justify-between bg-[#1E293B] rounded-xl p-5"
                    >
                        <div>
                            <h3 className="text-white font-semibold">
                                {integration.type}
                            </h3>

                            <p className="text-slate-400 text-sm">
                                {integration.type}
                            </p>
                        </div>

                        {integration.status == "connected" ? (
                            <span className="text-green-400 font-medium">
                                Connected
                            </span>
                        ) : (
                            <button
                                onClick={() => {
                                    setSelectedIntegration(integration);
                                    setShowModal(true);
                                }}
                                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
                            >
                                Connect
                            </button>
                        )}
                    </div>

                ))}

            </div>

            {showModal && (
                <ConnectModal
                    integration={selectedIntegration}
                    close={() => setShowModal(false)}
                    refresh={loadIntegrations}
                />
            )}

        </div>
    );
};

export default IntegrationStep;