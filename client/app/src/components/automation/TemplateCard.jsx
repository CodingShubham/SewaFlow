import { Check } from "lucide-react";

const TemplateCard = ({
    icon,
    title,
    description,
    selected,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className={`
                relative w-full text-left rounded-2xl border transition-all duration-200
                p-5 group
                ${
                    selected
                        ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                        : "border-slate-800 bg-[#111827] hover:border-slate-600 hover:-translate-y-1"
                }
            `}
        >
            {selected && (
                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                    <Check size={15} className="text-white" />
                </div>
            )}

            <div className="text-4xl mb-5">
                {icon}
            </div>

            <h3 className="text-lg font-semibold text-white">
                {title}
            </h3>

            <p className="mt-2 text-sm text-slate-400 leading-6">
                {description}
            </p>
        </button>
    );
};

export default TemplateCard;