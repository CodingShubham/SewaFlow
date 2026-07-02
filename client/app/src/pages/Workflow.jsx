import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Plus, Search } from "lucide-react";
import { getWorkflows } from "../services/workflowService";

const Workflow = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [workflows, setWorkflows] = useState([]);

    useEffect(() => {

        loadWorkflows();

    }, []);

    const loadWorkflows = async () => {

        try {

            const data = await getWorkflows();

            setWorkflows(data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="flex min-h-screen bg-[#0f1117]">

            <Sidebar />

            <main className="flex-1 p-8">

                <div className="flex justify-between items-center">

                    <div>

                        <h1 className="text-4xl font-bold text-white">

                            Workflows

                        </h1>

                        <p className="text-slate-400 mt-2">

                            Manage all your business automations.

                        </p>

                    </div>

                    <button

                        onClick={() => navigate("/create-automation")}

                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 rounded-xl px-6 py-3 text-white"

                    >

                        <Plus size={18} />

                        New Automation

                    </button>

                </div>

                <div className="mt-10 relative">

                    <Search
                        size={18}
                        className="absolute left-4 top-3.5 text-slate-500"
                    />

                    <input

                        placeholder="Search workflow..."

                        className="w-full rounded-xl bg-[#161b27] border border-[#1e2130] pl-11 pr-4 py-3 text-white outline-none"

                    />

                </div>

                <div className="mt-8 space-y-5">

                    {loading && (

                        <p className="text-slate-400">

                            Loading...

                        </p>

                    )}

                    {!loading && workflows.length === 0 && (

                        <div className="rounded-2xl bg-[#161b27] border border-[#1e2130] p-12 text-center">

                            <h2 className="text-2xl text-white font-semibold">

                                No Automations Yet

                            </h2>

                            <p className="text-slate-400 mt-3">

                                Create your first automation.

                            </p>

                        </div>

                    )}

                    {workflows.map(workflow => (

                        <div

                            key={workflow._id}

                            className="bg-[#161b27] border border-[#1e2130] rounded-2xl p-6"

                        >

                            <div className="flex justify-between">

                                <div>

                                    <h2 className="text-xl text-white font-semibold">

                                        {workflow.name}

                                    </h2>

                                    <p className="text-slate-400 mt-1">

                                        {workflow.template}

                                    </p>

                                </div>

                                <span

                                    className={`px-3 py-1 rounded-full text-sm ${
                                        workflow.isActive
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-slate-700 text-slate-300"
                                    }`}

                                >

                                    {workflow.isActive ? "Active" : "Inactive"}

                                </span>

                            </div>

                            <div className="grid grid-cols-2 gap-5 mt-6">

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

                            <div className="mt-8 flex gap-3">

                                <button

                                    className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-white"

                                >

                                    Open

                                </button>

                                <button

                                    className="flex-1 rounded-xl border border-slate-700 hover:bg-slate-800 py-3 text-white"

                                >

                                    Edit

                                </button>

                                <button

                                    className="flex-1 rounded-xl border border-red-500 text-red-400 hover:bg-red-500/10 py-3"

                                >

                                    Delete

                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </main>

        </div>

    );

};

export default Workflow;