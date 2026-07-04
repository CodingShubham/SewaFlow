import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ArrowLeft } from "lucide-react";
import { getWorkflow, updateWorkflow,deleteWorkflow } from "../services/workflowService";

const WorkflowDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [workflow, setWorkflow] = useState(null);

    useEffect(() => {

        loadWorkflow();

    }, []);

    const loadWorkflow = async () => {

        try {

            const data = await getWorkflow(id);

            setWorkflow(data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="flex min-h-screen bg-[#0f1117]">

                <Sidebar />

                <main className="flex-1 p-8 text-white">

                    Loading Workflow...

                </main>

            </div>

        );

    }

    const handleToggleStatus = async () => {

    try {

        const updated = await updateWorkflow(

            workflow._id,

            {

                isActive: !workflow.isActive

            }

        );

        setWorkflow(updated);

    }

    catch (error) {

        console.log(error);

    }

};


  const handleDelete = async () => {

    const confirmed = window.confirm(

        "Are you sure you want to delete this workflow?"

    );

    if (!confirmed) return;

    try {

        await deleteWorkflow(workflow._id);

        navigate("/workflow");

    }

    catch (error) {

        console.log(error);

    }

};


    return (

        <div className="flex min-h-screen bg-[#0f1117]">

            <Sidebar />

            <main className="flex-1 p-8">

                {/* Back */}

                <button

                    onClick={() => navigate("/workflow")}

                    className="flex items-center gap-2 text-slate-400 hover:text-white"

                >

                    <ArrowLeft size={18} />

                    Back

                </button>

                {/* Header */}

                <div className="mt-8 flex justify-between items-start">

                    <div>

                        <h1 className="text-4xl font-bold text-white">

                            {workflow.name}

                        </h1>

                        <p className="text-slate-400 mt-2">

                            {workflow.template}

                        </p>

                    </div>

                    <span

                        className={`px-4 py-2 rounded-full text-sm font-medium ${workflow.isActive
                                ? "bg-green-500/20 text-green-400"
                                : "bg-slate-700 text-slate-300"
                            }`}

                    >

                        {workflow.isActive ? "Active" : "Inactive"}

                    </span>

                </div>

                {/* Overview */}

                <div className="grid lg:grid-cols-2 gap-6 mt-10">

                    <div className="bg-[#161b27] border border-[#1e2130] rounded-2xl p-6">

                        <h2 className="text-xl font-semibold text-white">

                            Overview

                        </h2>

                        <div className="space-y-5 mt-6">

                            <div>

                                <p className="text-slate-500 text-sm">

                                    Template

                                </p>

                                <p className="text-white">

                                    {workflow.template}

                                </p>

                            </div>

                            <div>

                                <p className="text-slate-500 text-sm">

                                    Created

                                </p>

                                <p className="text-white">

                                    {new Date(workflow.createdAt).toLocaleDateString()}

                                </p>

                            </div>

                            <div>

                                <p className="text-slate-500 text-sm">

                                    Integration

                                </p>

                                <p className="text-white">

                                    WhatsApp

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Configuration */}

                    <div className="bg-[#161b27] border border-[#1e2130] rounded-2xl p-6">

                        <h2 className="text-xl font-semibold text-white">

                            Configuration

                        </h2>

                        <div className="space-y-5 mt-6">

                            <div className="flex justify-between">

                                <span className="text-slate-400">

                                    Approval

                                </span>

                                <span className="text-white">

                                    {workflow.config.approvalMode}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-slate-400">

                                    Out of Stock

                                </span>

                                <span className="text-white">

                                    {workflow.config.outOfStockBehaviour}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-slate-400">

                                    Invoice

                                </span>

                                <span className="text-white">

                                    {workflow.config.invoiceMode}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-slate-400">

                                    Notifications

                                </span>

                                <span className="text-white">

                                    {workflow.config.notificationsEnabled
                                        ? "Enabled"
                                        : "Disabled"}

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Actions */}

                <div className="mt-10 bg-[#161b27] border border-[#1e2130] rounded-2xl p-6">

                    <h2 className="text-xl font-semibold text-white">

                        Actions

                    </h2>

                    <div className="flex gap-4 mt-6">

                        <button

                            onClick={() => navigate(`/workflows/${workflow._id}/edit`)}

                            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white"

                        >

                            Edit

                        </button>

                            <button

    onClick={handleToggleStatus}

    className={`px-6 py-3 rounded-xl text-white ${
        workflow.isActive
            ? "bg-yellow-600 hover:bg-yellow-500"
            : "bg-green-600 hover:bg-green-500"
    }`}

>

    {workflow.isActive ? "Pause" : "Activate"}

</button>

                   <button

    onClick={handleDelete}

    className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white"

>

    Delete

</button>

                    </div>

                </div>

                {/* Execution History */}

                <div className="mt-10 bg-[#161b27] border border-[#1e2130] rounded-2xl p-6">

                    <h2 className="text-xl font-semibold text-white">

                        Execution History

                    </h2>

                    <p className="text-slate-400 mt-3">

                        Coming soon...

                    </p>

                </div>

            </main>

        </div>

    );

};

export default WorkflowDetails;