import { useState } from "react";
import { Building2, User, Briefcase, Globe, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createBusinessConfig } from "../../services/businessConfigService";

const BusinessSetup = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        businessName: "",
        ownerName: "",
        industry: "",
        currency: "INR",
        timezone: "Asia/Kolkata",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await createBusinessConfig(formData);

            navigate("/integrations");
        } catch (err) {
            alert(
                err.response?.data?.message ||
                    "Unable to create business profile."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">

            <div className="w-full max-w-5xl bg-[#111827] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl grid lg:grid-cols-2">

                {/* Left Section */}

                <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-12">

                    <div>

                        <h1 className="text-5xl font-bold text-white leading-tight">
                            Welcome to
                            <br />
                            SewaFlow
                        </h1>

                        <p className="mt-6 text-blue-100 text-lg leading-8">
                            Configure your business once and automate everything
                            from WhatsApp orders to invoices, inventory and
                            customer management.
                        </p>

                    </div>

                    <div className="space-y-5">

                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                                ⚡
                            </div>
                            <p className="text-white">
                                Automate Order Processing
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                                📦
                            </div>
                            <p className="text-white">
                                Live Inventory Tracking
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                                📄
                            </div>
                            <p className="text-white">
                                Automatic Invoice Generation
                            </p>
                        </div>

                    </div>

                </div>

                {/* Right Section */}

                <div className="p-10">

                    <h2 className="text-3xl font-bold text-white">
                        Business Setup
                    </h2>

                    <p className="text-slate-400 mt-2">
                        Complete this once before creating your first automation.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-10 space-y-6"
                    >

                        {/* Business */}

                        <div>

                            <label className="text-slate-300 mb-2 block">
                                Business Name
                            </label>

                            <div className="relative">

                                <Building2
                                    size={18}
                                    className="absolute left-4 top-4 text-slate-500"
                                />

                                <input
                                    type="text"
                                    required
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    placeholder="ABC Traders"
                                    className="w-full bg-[#1E293B] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-blue-500 outline-none"
                                />

                            </div>

                        </div>

                        {/* Owner */}

                        <div>

                            <label className="text-slate-300 mb-2 block">
                                Business Owner
                            </label>

                            <div className="relative">

                                <User
                                    size={18}
                                    className="absolute left-4 top-4 text-slate-500"
                                />

                                <input
                                    type="text"
                                    required
                                    name="ownerName"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full bg-[#1E293B] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-blue-500 outline-none"
                                />

                            </div>

                        </div>

                        <div className="grid md:grid-cols-2 gap-5">

                            {/* Industry */}

                            <div>

                                <label className="text-slate-300 mb-2 block">
                                    Industry
                                </label>

                                <div className="relative">

                                    <Briefcase
                                        size={18}
                                        className="absolute left-4 top-4 text-slate-500"
                                    />

                                    <select
                                        required
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        className="w-full appearance-none bg-[#1E293B] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-500 outline-none"
                                    >
                                        <option value="">
                                            Select Industry
                                        </option>
                                        <option>Retail</option>
                                        <option>Wholesale</option>
                                        <option>Restaurant</option>
                                        <option>Pharmacy</option>
                                        <option>Electronics</option>
                                        <option>Service</option>
                                        <option>Manufacturing</option>
                                        <option>Other</option>
                                    </select>

                                </div>

                            </div>

                            {/* Currency */}

                            <div>

                                <label className="text-slate-300 mb-2 block">
                                    Currency
                                </label>

                                <select
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleChange}
                                    className="w-full bg-[#1E293B] border border-slate-700 rounded-xl py-3 px-4 text-white outline-none"
                                >
                                    <option value="INR">
                                        INR (₹)
                                    </option>
                                </select>

                            </div>

                        </div>

                        {/* Timezone */}

                        <div>

                            <label className="text-slate-300 mb-2 block">
                                Timezone
                            </label>

                            <div className="relative">

                                <Globe
                                    size={18}
                                    className="absolute left-4 top-4 text-slate-500"
                                />

                                <select
                                    name="timezone"
                                    value={formData.timezone}
                                    onChange={handleChange}
                                    className="w-full bg-[#1E293B] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none"
                                >
                                    <option value="Asia/Kolkata">
                                        Asia/Kolkata
                                    </option>
                                </select>

                            </div>

                        </div>

                        {/* Button */}

                        <button
                            disabled={loading}
                            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {loading ? (
                                "Creating Workspace..."
                            ) : (
                                <>
                                    Continue
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default BusinessSetup;