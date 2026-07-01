import { useState, useEffect } from "react";
import TemplateCard from "../components/automation/TemplateCard";
import StepIndicator from "../components/automation/StepIndicator";
import { templates } from "../data/templates";
import { STEPS } from "../data/wizardSteps";
import BusinessSetupForm from "../components/business/BusinessSetupForm";
import StartMethod from "../components/automation/StartMethod";
import { getBusinessConfig } from "../services/businessConfigService";
import IntegrationStep from "../components/Integrations/IntegrationStep";


const CreateAutomation = () => {
    const [currentStep, setCurrentStep] = useState(STEPS.START);
    const [wizardData, setWizardData] = useState({
        creationMethod: null,
        template: null,
        businessConfig: null,
        integrations: [],
        configuration: {},
    });

    const [checkingBusiness, setCheckingBusiness] = useState(false);


    const handleCreateAutomation = () => {
        console.log("Create automation", wizardData);
    };


    const checkBusinessSetup = async () => {
        try {
            setCheckingBusiness(true);

            const response = await getBusinessConfig();

            if (response.success && response.data) {

                console.log("Business already exists");

                setWizardData(prev => ({
                    ...prev,
                    businessConfig: response.data,
                }));

                setCurrentStep(STEPS.INTEGRATIONS);

            } else {

                setCurrentStep(STEPS.BUSINESS);

            }

        } catch (error) {

            console.log("Business profile not found");

            setCurrentStep(STEPS.BUSINESS);

        } finally {

            setCheckingBusiness(false);

        }
    };



    return (
        <div className="min-h-screen bg-[#0F172A] p-8">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold text-white">
                    Create Automation
                </h1>

                <p className="text-slate-400 mt-2">
                    Build your first automation.
                </p>

                <StepIndicator currentStep={currentStep} />

                <div className="mt-10">

                    {currentStep === STEPS.START && (

                        <StartMethod

                            selected={wizardData.creationMethod}

                            onSelect={(method) =>
                                setWizardData((prev) => ({
                                    ...prev,
                                    creationMethod: method,
                                }))
                            }

                        />

                    )}

                    {currentStep === STEPS.TEMPLATE && (

                        <div>

                            <h2 className="text-2xl font-semibold text-white">
                                Choose Template
                            </h2>

                            <p className="text-slate-400 mt-2">
                                Select a template to start with.
                            </p>

                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

                                {templates.map((template) => (

                                    <TemplateCard
                                        key={template.id}
                                        {...template}
                                        selected={wizardData.template?.id === template.id}
                                        onClick={() =>
                                            setWizardData((prev) => ({
                                                ...prev,
                                                template,
                                            }))
                                        }
                                    />

                                ))}

                            </div>

                        </div>

                    )}

                    {currentStep === STEPS.BUSINESS && (
                        <BusinessSetupForm
                            onSuccess={(businessConfig) => {
                                console.log("Received from BusinessSetup:", businessConfig);
                                setWizardData((prev) => ({
                                    ...prev,
                                    businessConfig,
                                }));

                                setCurrentStep(STEPS.INTEGRATIONS);
                            }}
                        />
                    )}

                  {currentStep === STEPS.INTEGRATIONS && (
    <IntegrationStep
        requiredIntegrations={
            wizardData.template?.requirements?.integrations || []
        }
        onSuccess={(connectedIntegrations) => {
            console.log(
                "Received Connected Integrations:",
                connectedIntegrations
            );

            setWizardData((prev) => ({
                ...prev,
                integrations: connectedIntegrations,
            }));
        }}
    />
)}

                    {currentStep === STEPS.CONFIGURATION && (
                        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">
                            <h2 className="text-2xl font-semibold text-white">
                                Automation Configuration
                            </h2>

                            <p className="text-slate-400 mt-2">
                                Configure triggers, actions and AI settings.
                            </p>
                        </div>
                    )}

                    {currentStep === STEPS.REVIEW && (
                        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">
                            <h2 className="text-2xl font-semibold text-white">
                                Review Automation
                            </h2>

                            <p className="text-slate-400 mt-2">
                                Review everything before creating your automation.
                            </p>
                        </div>
                    )}

                </div>

                <div className="flex justify-between mt-10">

                    <button

                        onClick={() => {

                            switch (currentStep) {

                                case STEPS.TEMPLATE:
                                    setCurrentStep(STEPS.START);
                                    break;

                                case STEPS.BUSINESS:
                                    setCurrentStep(STEPS.TEMPLATE);
                                    break;

                                case STEPS.INTEGRATIONS:
                                    setCurrentStep(STEPS.BUSINESS);
                                    break;

                                case STEPS.CONFIGURATION:
                                    setCurrentStep(STEPS.INTEGRATIONS);
                                    break;

                                case STEPS.REVIEW:
                                    setCurrentStep(STEPS.CONFIGURATION);
                                    break;

                                default:
                                    break;

                            }

                        }}
                        disabled={currentStep === STEPS.START}
                        className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Back
                    </button>

                    <button
                        disabled={
                            checkingBusiness ||

                            (currentStep === STEPS.START &&
                                !wizardData.creationMethod) ||

                            (currentStep === STEPS.TEMPLATE &&
                                !wizardData.template) ||

                            (currentStep === STEPS.INTEGRATIONS &&
                            wizardData.integrations.length === 0)
                        }
                        onClick={() => {

                            switch (currentStep) {

                                case STEPS.START:
                                    setCurrentStep(STEPS.TEMPLATE);
                                    break;

                                case STEPS.TEMPLATE:
                                    checkBusinessSetup();
                                    break;

                                case STEPS.BUSINESS:
                                    setCurrentStep(STEPS.INTEGRATIONS);
                                    break;

                                case STEPS.INTEGRATIONS:
                                    setCurrentStep(STEPS.CONFIGURATION);
                                    break;

                                case STEPS.CONFIGURATION:
                                    setCurrentStep(STEPS.REVIEW);
                                    break;

                                case STEPS.REVIEW:
                                    handleCreateAutomation();
                                    break;

                                default:
                                    break;
                            }

                        }}
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                    >

                        {checkingBusiness
                            ? "Checking Workspace..."
                            : currentStep === STEPS.REVIEW
                                ? "Create Automation"
                                : currentStep === STEPS.START
                                    ? "Next"
                                    : "Continue"}

                    </button>

                </div>

            </div>

        </div>
    );
};

export default CreateAutomation;