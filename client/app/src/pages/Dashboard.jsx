import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../api/axios';
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { getWorkflows } from "../services/workflowService";


const StatCard = ({ label, value, icon, color }) => (
    <div className="bg-[#161b27] border border-[#1e2130] rounded-xl p-4 flex items-center gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
            <i className={`ti ${icon} text-lg`} />
        </div>
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-xl font-semibold text-white">{value}</p>
        </div>
    </div>
);

const Dashboard = () => {
    const [executions, setExecutions] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [workflows, setWorkflows] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
               
     const [exRes, cuRes, inRes, workflows] = await Promise.all([
    API.get("/executions"),
    API.get("/customers"),
    API.get("/invoices"),
    getWorkflows(),
]);

                setExecutions(exRes.data);
                setCustomers(cuRes.data);
                setInvoices(inRes.data);
                setWorkflows(workflows);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    const recentExecutions = executions.slice(0, 5);

    return (

        

        <div className="flex min-h-screen bg-[#0f1117]">

            <Sidebar />
            <main className="flex-1 p-6">
                
                {loading ? (
    <p className="text-gray-500 text-sm">Loading...</p>
) : workflows.length === 0 ? (

    <>
        {/* Hero */}

        <div className="flex items-center justify-between mb-10">

            <div>

                <p className="uppercase tracking-wider text-xs text-slate-500">
                    Dashboard
                </p>

                <h1 className="text-4xl font-bold text-white mt-2">
                    Welcome to SewaFlow 👋
                </h1>

                <p className="text-slate-400 mt-3 max-w-xl">
                    Start by creating your first automation.
                    Once it's active, you'll be able to monitor
                    executions, customers, invoices, and business activity here.
                </p>

            </div>

        </div>

        {/* Empty State */}

        <div className="bg-[#161b27] border border-[#1e2130] rounded-2xl p-12 text-center">

            <div className="text-6xl mb-6">
                🚀
            </div>

            <h2 className="text-3xl font-bold text-white">
                Create your first automation
            </h2>

            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                Choose from ready-made automation templates built for small
                businesses. Connect your apps, configure the workflow,
                and activate it in just a few minutes.
            </p>

            <button
                onClick={() => navigate("/create-automation")}
                className="mt-8 bg-blue-600 hover:bg-blue-500 rounded-xl px-8 py-4 text-white font-semibold"
            >
                Create Automation
            </button>

        </div>

    </>

) : (

    <>

        {/* Hero */}

        <div className="flex items-center justify-between mb-10">

            <div>

                <p className="uppercase tracking-wider text-xs text-slate-500">
                    Dashboard
                </p>

                <h1 className="text-4xl font-bold text-white mt-2">
                    Welcome back 👋
                </h1>

                <p className="text-slate-400 mt-3 max-w-xl">
                    Manage your automations,
                    monitor executions,
                    and grow your business from one place.
                </p>

            </div>

            <button
                onClick={() => navigate("/create-automation")}
                className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 text-white font-medium"
            >
                <Plus size={18} />
                New Automation
            </button>

        </div>

        {/* Existing Statistics */}

        {/* =============================== */}
{/* Your Automations */}
{/* =============================== */}

<div className="mb-10">

    <div className="flex items-center justify-between mb-6">

        <div>

            <h2 className="text-2xl font-semibold text-white">
                Your Automations
            </h2>

            <p className="text-slate-400 mt-1">
                Manage your active business automations.
            </p>

        </div>

    </div>

    <div className="grid lg:grid-cols-2 gap-6">

        {workflows.map((workflow) => (

            <div
                key={workflow._id}
                className="rounded-2xl border border-[#1e2130] bg-[#161b27] p-6 hover:border-blue-500 transition-all"
            >

                {/* Header */}

                <div className="flex justify-between items-start">

                    <div>

                        <h3 className="text-xl font-semibold text-white">

                            {workflow.name}

                        </h3>

                        <p className="text-slate-400 mt-1">

                            {workflow.template}

                        </p>

                    </div>

                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                            workflow.isActive
                                ? "bg-green-500/20 text-green-400"
                                : "bg-slate-700 text-slate-300"
                        }`}
                    >

                        {workflow.isActive ? "Active" : "Inactive"}

                    </span>

                </div>

                {/* Info */}

                <div className="mt-6 grid grid-cols-2 gap-4">

                    <div>

                        <p className="text-xs text-slate-500">

                            Created

                        </p>

                        <p className="text-white mt-1">

                            {new Date(
                                workflow.createdAt
                            ).toLocaleDateString()}

                        </p>

                    </div>

                    <div>

                        <p className="text-xs text-slate-500">

                            Integration

                        </p>

                        <p className="text-white mt-1">

                            WhatsApp

                        </p>

                    </div>

                </div>

                {/* Actions */}

                <div className="mt-8 flex gap-3">

                    <button

                        className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-500 py-2 text-white font-medium"

                    >

                        Open

                    </button>

                    <button

                        className="flex-1 rounded-xl border border-slate-700 hover:bg-slate-800 py-2 text-white"

                    >

                        Edit

                    </button>

                </div>

            </div>

        ))}

    </div>

</div>

        <div className="grid grid-cols-4 gap-4 mb-8">

            <StatCard
                label="Total Executions"
                value={executions.length}
                icon="ti-player-play"
                color="bg-blue-500/10 text-blue-400"
            />

            <StatCard
                label="Customers"
                value={customers.length}
                icon="ti-users"
                color="bg-green-500/10 text-green-400"
            />

            <StatCard
                label="Invoices"
                value={invoices.length}
                icon="ti-file-invoice"
                color="bg-purple-500/10 text-purple-400"
            />

            <StatCard
                label="Total Revenue"
                value={`₹${totalRevenue}`}
                icon="ti-currency-rupee"
                color="bg-orange-500/10 text-orange-400"
            />

        </div>

        {/* Existing Recent Executions */}

        <div className="bg-[#161b27] border border-[#1e2130] rounded-xl p-5">

            <p className="text-sm font-medium text-gray-300 mb-4">
                Recent Executions
            </p>

            <div className="flex flex-col gap-2">

                {recentExecutions.length === 0 && (
                    <p className="text-sm text-gray-500">
                        No executions yet
                    </p>
                )}

                {recentExecutions.map((ex) => (

                    <div
                        key={ex._id}
                        className="flex justify-between items-center px-3 py-2.5 bg-[#0f1117] rounded-lg"
                    >

                        <div className="flex items-center gap-3">

                            <span
                                className={`w-2 h-2 rounded-full ${
                                    ex.status === "success"
                                        ? "bg-green-500"
                                        : ex.status === "failed"
                                        ? "bg-red-500"
                                        : "bg-yellow-500"
                                }`}
                            />

                            <span className="text-sm text-gray-300">
                                whatsapp_order
                            </span>

                        </div>

                        <div className="flex items-center gap-4">

                            <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                    ex.status === "success"
                                        ? "bg-green-500/10 text-green-400"
                                        : ex.status === "failed"
                                        ? "bg-red-500/10 text-red-400"
                                        : "bg-yellow-500/10 text-yellow-400"
                                }`}
                            >
                                {ex.status}
                            </span>

                            <span className="text-xs text-gray-500">
                                {new Date(ex.startedAt).toLocaleTimeString()}
                            </span>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    </>

)}

            
            </main>
        </div>
    );
};

export default Dashboard;