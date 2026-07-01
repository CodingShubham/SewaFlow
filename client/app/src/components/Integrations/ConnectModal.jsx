import { useState } from "react";
import { X, MessageCircle, Loader2 } from "lucide-react";
import {
    createIntegration,
    connectIntegration
} from "../../services/integrationService";

const ConnectModal = ({
    integration,
    close,
    refresh
}) => {

    if (!integration) return null;

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        businessAccountId: "",
        phoneNumberId: "",
        accessToken: ""
    });

    const handleChange = (e) => {

        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    };

    const handleSubmit = async () => {

        if (
            !formData.businessAccountId ||
            !formData.phoneNumberId ||
            !formData.accessToken
        ) {

            return alert("Please fill all fields.");

        }

        try {

            setLoading(true);

           let integrationId = integration?._id;

if (!integrationId) {
    const newIntegration = await createIntegration({
        type: "whatsapp"
    });

    integrationId = newIntegration._id;
}

await connectIntegration(
    integrationId,
    formData
);

            await refresh();

            close();

        }

   catch (err) {

    console.log("FULL ERROR:", err);

    console.log("STATUS:", err.response?.status);

    console.log("DATA:", err.response?.data);

    alert(
        JSON.stringify(err.response?.data, null, 2)
    );

}

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6 overflow-y-auto">

            <div className="w-full max-w-2xl max-h-[90vh] rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#0F172A] shadow-2xl overflow-hidden flex flex-col">

                {/* Header */}

                <div className="flex items-start sm:items-center justify-between border-b border-slate-800 px-4 sm:px-8 py-4 sm:py-6 gap-3">

                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">

                        <div className="h-10 w-10 sm:h-14 sm:w-14 shrink-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">

                            <MessageCircle
                                className="text-white"
                                size={22}
                            />

                        </div>

                        <div className="min-w-0">

                            <h2 className="text-lg sm:text-2xl font-semibold text-white truncate">

                                Connect WhatsApp Business

                            </h2>

                            <p className="text-xs sm:text-base text-slate-400 mt-0.5 sm:mt-1 truncate">

                                Connect your Meta Business account.

                            </p>

                        </div>

                    </div>

                    <button
                        onClick={close}
                        className="text-slate-400 hover:text-white shrink-0"
                    >

                        <X size={22} />

                    </button>

                </div>

                {/* Body */}

                <div className="space-y-4 sm:space-y-6 p-4 sm:p-8 overflow-y-auto">

                    <div>

                        <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-slate-300">

                            Business Account ID

                        </label>

                        <input

                            name="businessAccountId"

                            value={formData.businessAccountId}

                            onChange={handleChange}

                            placeholder="734982734982734"

                            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white outline-none focus:border-blue-500"

                        />

                    </div>

                    <div>

                        <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-slate-300">

                            Phone Number ID

                        </label>

                        <input

                            name="phoneNumberId"

                            value={formData.phoneNumberId}

                            onChange={handleChange}

                            placeholder="1071961815993970"

                            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white outline-none focus:border-blue-500"

                        />

                    </div>

                    <div>

                        <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-slate-300">

                            Permanent Access Token

                        </label>

                        <textarea

                            rows={4}

                            name="accessToken"

                            value={formData.accessToken}

                            onChange={handleChange}

                            placeholder="EAAG..."

                            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white outline-none focus:border-blue-500"

                        />

                    </div>

                </div>

                {/* Footer */}

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 border-t border-slate-800 bg-slate-950 px-4 sm:px-8 py-4 sm:py-5">

                    <button

                        onClick={close}

                        disabled={loading}

                        className="w-full sm:w-auto rounded-xl border border-slate-700 px-6 py-2.5 sm:py-3 text-sm sm:text-base text-slate-300 hover:bg-slate-800"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleSubmit}

                        disabled={loading}

                        className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-white font-medium hover:from-blue-500 hover:to-indigo-500 flex items-center justify-center gap-2"

                    >

                        {

                            loading ?

                                <>

                                    <Loader2
                                        className="animate-spin"
                                        size={18}
                                    />

                                    Connecting...

                                </>

                                :

                                "Connect"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

};

export default ConnectModal;