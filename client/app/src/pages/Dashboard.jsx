import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../api/axios';

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [exRes, cuRes, inRes] = await Promise.all([
                    API.get('/executions'),
                    API.get('/customers'),
                    API.get('/invoices'),
                ]);
                setExecutions(exRes.data);
                setCustomers(cuRes.data);
                setInvoices(inRes.data);
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
                <p className="text-xl font-semibold text-white mb-6">Overview</p>

                {loading ? (
                    <p className="text-gray-500 text-sm">Loading...</p>
                ) : (
                    <>
                        <div className="grid grid-cols-4 gap-4 mb-8">
                            <StatCard label="Total Executions" value={executions.length} icon="ti-player-play" color="bg-blue-500/10 text-blue-400" />
                            <StatCard label="Customers" value={customers.length} icon="ti-users" color="bg-green-500/10 text-green-400" />
                            <StatCard label="Invoices" value={invoices.length} icon="ti-file-invoice" color="bg-purple-500/10 text-purple-400" />
                            <StatCard label="Total Revenue" value={`₹${totalRevenue}`} icon="ti-currency-rupee" color="bg-orange-500/10 text-orange-400" />
                        </div>

                        <div className="bg-[#161b27] border border-[#1e2130] rounded-xl p-5">
                            <p className="text-sm font-medium text-gray-300 mb-4">Recent Executions</p>
                            <div className="flex flex-col gap-2">
                                {recentExecutions.length === 0 && (
                                    <p className="text-sm text-gray-500">No executions yet</p>
                                )}
                                {recentExecutions.map((ex) => (
                                    <div key={ex._id} className="flex justify-between items-center px-3 py-2.5 bg-[#0f1117] rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <span className={`w-2 h-2 rounded-full ${ex.status === 'success' ? 'bg-green-500' : ex.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                                            <span className="text-sm text-gray-300">whatsapp_order</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${ex.status === 'success' ? 'bg-green-500/10 text-green-400' : ex.status === 'failed' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
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