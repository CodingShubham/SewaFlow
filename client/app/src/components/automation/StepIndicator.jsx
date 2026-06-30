import { STEP_ITEMS } from "../../data/wizardSteps";

const StepIndicator = ({ currentStep }) => {
    return (
        <div className="mb-10">
            <div className="flex items-center justify-between">

                {STEP_ITEMS.map((step, index) => {

                    const stepNumber = index + 1;
                    const active = currentStep === step.id;
                    const completed = currentStep > step.id;

                    return (
                        <div
                           key={step.id}
                            className="flex-1 flex items-center"
                        >

                            <div className="flex flex-col items-center">

                                <div
                                    className={`
                                        w-10 h-10 rounded-full
                                        flex items-center justify-center
                                        text-sm font-semibold
                                        transition-all

                                        ${
                                            completed
                                                ? "bg-green-600 text-white"
                                                : active
                                                ? "bg-blue-600 text-white"
                                                : "bg-[#1E293B] border border-slate-700 text-slate-400"
                                        }
                                    `}
                                >
                                    {step.id}
                                </div>

                                <p
                                    className={`
                                        mt-3 text-xs font-medium

                                        ${
                                            active
                                                ? "text-white"
                                                : "text-slate-500"
                                        }
                                    `}
                                >
                                    {step.title}
                                </p>

                            </div>

                            {index !== STEP_ITEMS.length - 1  && (

                                <div
                                    className={`
                                        flex-1 h-[2px] mx-3

                                        ${
                                            completed
                                                ? "bg-green-600"
                                                : "bg-slate-700"
                                        }
                                    `}
                                />

                            )}

                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default StepIndicator;