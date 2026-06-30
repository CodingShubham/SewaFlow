import { useState } from "react";
import { X, MessageCircle, Loader2 } from "lucide-react";
import { connectIntegration } from "../../services/integrationService";

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

            await connectIntegration(
                integration._id,
                formData
            )

            await refresh();

            close();

        }

        catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Unable to connect integration."
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

            <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-[#0F172A] shadow-2xl overflow-hidden">

                {/* Header */}

                <div className="flex items-center justify-between border-b border-slate-800 px-8 py-6">

                    <div className="flex items-center gap-4">

                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">

                            <MessageCircle
                                className="text-white"
                                size={28}
                            />

                        </div>

                        <div>

                            <h2 className="text-2xl font-semibold text-white">

                                Connect WhatsApp Business

                            </h2>

                            <p className="text-slate-400 mt-1">

                                Connect your Meta Business account.

                            </p>

                        </div>

                    </div>

                    <button
                        onClick={close}
                        className="text-slate-400 hover:text-white"
                    >

                        <X />

                    </button>

                </div>

                {/* Body */}

                <div className="space-y-6 p-8">

                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-300">

                            Business Account ID

                        </label>

                        <input

                            name="businessAccountId"

                            value={formData.businessAccountId}

                            onChange={handleChange}

                            placeholder="734982734982734"

                            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"

                        />

                    </div>

                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-300">

                            Phone Number ID

                        </label>

                        <input

                            name="phoneNumberId"

                            value={formData.phoneNumberId}

                            onChange={handleChange}

                            placeholder="1071961815993970"

                            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"

                        />

                    </div>

                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-300">

                            Permanent Access Token

                        </label>

                        <textarea

                            rows={5}

                            name="accessToken"

                            value={formData.accessToken}

                            onChange={handleChange}

                            placeholder="EAAG..."

                            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"

                        />

                    </div>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-4 border-t border-slate-800 bg-slate-950 px-8 py-5">

                    <button

                        onClick={close}

                        disabled={loading}

                        className="rounded-xl border border-slate-700 px-6 py-3 text-slate-300 hover:bg-slate-800"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleSubmit}

                        disabled={loading}

                        className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-white font-medium hover:from-blue-500 hover:to-indigo-500 flex items-center gap-2"

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