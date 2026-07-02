import WhatsAppOrderConfiguration from "./WhatsAppOrderConfiguration";

const ConfigurationRenderer = ({
    template,
    value,
    onChange,
}) => {

    if (!template) return null;

    switch (template.id) {

        case "whatsapp-order":

            return (
                <WhatsAppOrderConfiguration
                    value={value}
                    onChange={onChange}
                />
            );

        default:

            return (

                <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">

                    <h2 className="text-white text-2xl font-semibold">
                        Configuration
                    </h2>

                    <p className="text-slate-400 mt-2">
                        No configuration available for this automation yet.
                    </p>

                </div>

            );

    }

};

export default ConfigurationRenderer;