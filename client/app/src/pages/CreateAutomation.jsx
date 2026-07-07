import { useState, useEffect } from "react";
import TemplateCard from "../components/automation/TemplateCard";
import StepIndicator from "../components/automation/StepIndicator";
import { templates } from "../data/templates";
import { STEPS } from "../data/wizardSteps";
import BusinessSetupForm from "../components/business/BusinessSetupForm";
import StartMethod from "../components/automation/StartMethod";
import { getBusinessConfig } from "../services/businessConfigService";
import IntegrationStep from "../components/Integrations/IntegrationStep";
import ConfigurationRenderer from "../components/configuration/ConfigurationRenderer";
import ReviewStep from "../components/automation/ReviewStep";
import { createWorkflow } from "../services/workflowService";
import BusinessData from "../pages/BusinessData";
import Sidebar from "../components/Sidebar";

const CreateAutomation = () => {
    const [currentStep, setCurrentStep] = useState(STEPS.START);
    const [wizardData, setWizardData] = useState({
        creationMethod: null,
        template: null,
        businessConfig: null,
        dataSource: null,
        integrations: [],
        configuration: {},
    });

    const [checkingBusiness, setCheckingBusiness] = useState(false);


    const handleCreateAutomation = async () => {

        try {

            const payload = {

                businessConfigId:
                    wizardData.businessConfig._id,

                name:
                    wizardData.template.title,

                template:
                    wizardData.template.id,

                config:
                    wizardData.configuration

            };

            console.log("Workflow Payload:", payload);

            const workflow = await createWorkflow(payload);

            console.log("Workflow Created:", workflow);

            alert("Automation created successfully!");

            // We'll redirect later
            // navigate("/workflows");

        }

        catch (error) {

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Unable to create automation."

            );

        }

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

    <div className="flex min-h-screen bg-[#0f1117]">

        <Sidebar />

        <main className="flex-1 overflow-y-auto">

            <div className="max-w-7xl mx-auto p-8">

                {/* Existing content starts here */}

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
                                                configuration: {
                                                    ...template.defaultConfiguration
                                                }
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



                    {currentStep === STEPS.DATA_SOURCE && (

                        <BusinessData
                            embedded={true}
                            onSuccess={(dataSource) => {

                                setWizardData(prev => ({
                                    ...prev,
                                    dataSource
                                }));

                                setCurrentStep(STEPS.DATA_SOURCE);

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

                        <ConfigurationRenderer

                            template={wizardData.template}

                            value={wizardData.configuration}

                            onChange={(configuration) =>

                                setWizardData(prev => ({
                                    ...prev,
                                    configuration
                                }))

                            }

                        />

                    )}

                    {currentStep === STEPS.REVIEW && (

                        <ReviewStep

                            template={wizardData.template}

                            integrations={wizardData.integrations}

                            configuration={wizardData.configuration}

                        />

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

                                case STEPS.DATA_SOURCE:
                                    setCurrentStep(STEPS.BUSINESS);
                                    break;

                                case STEPS.INTEGRATIONS:
                                    setCurrentStep(STEPS.DATA_SOURCE);
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
                                    setCurrentStep(STEPS.DATA_SOURCE);
                                    break;

                                case STEPS.DATA_SOURCE:
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
            </main>
        </div>
    );
};

export default CreateAutomation;