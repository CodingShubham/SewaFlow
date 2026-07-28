import { Check } from "lucide-react";

const TemplateCard = ({
    icon,
    title,
    description,
    features = [],
    comingSoon = false,
    selected,
    onClick,
}) => {
    return (
        <button
            disabled={comingSoon}
            onClick={onClick}
            className={`
                relative w-full text-left rounded-2xl border transition-all duration-200 p-6
                ${
                    comingSoon
                        ? "border-slate-800 bg-[#111827] opacity-60 cursor-not-allowed"
                        : selected
                        ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                        : "border-slate-800 bg-[#111827] hover:border-slate-600 hover:-translate-y-1"
                }
            `}
        >
            {selected && !comingSoon && (
                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                    <Check size={15} className="text-white" />
                </div>
            )}

            {comingSoon && (
                <div className="absolute top-4 right-4 rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                    Coming Soon
                </div>
            )}

            <div className="text-5xl mb-5">
                {icon}
            </div>

            <h3 className="text-xl font-semibold text-white">
                {title}
            </h3>

            <p className="mt-2 text-sm text-slate-400 leading-6">
                {description}
            </p>

            {features.length > 0 && (
                <div className="mt-6 space-y-2">
                    {features.map((feature) => (
                        <div
                            key={feature}
                            className="flex items-center gap-2 text-sm text-slate-300"
                        >
                            <Check
                                size={15}
                                className="text-green-400"
                            />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>
            )}
        </button>
    );
};

export default TemplateCard;