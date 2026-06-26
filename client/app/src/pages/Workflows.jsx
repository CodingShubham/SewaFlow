import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../api/axios';

const Workflows = () => {
    const [workflows, setWorkflows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkflows = async () => {
            try {
                const res = await API.get('/workflows');
                setWorkflows(res.data);
                console.log(res.data)
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkflows();
    }, []);

    const toggleWorkflow = async (id, current) => {
        try {
            await API.put(`/workflows/${id}`, { isActive: !current });
            setWorkflows(workflows.map(w =>
                w._id === id ? { ...w, isActive: !current } : w
            ));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#0f1117]">
            <Sidebar />
            <main className="flex-1 p-6">
                <p className="text-xl font-semibold text-white mb-6">Workflows</p>

                {loading ? (
                    <p className="text-gray-500 text-sm">Loading...</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {workflows.length === 0 && (
                            <p className="text-sm text-gray-500">No workflows yet</p>
                        )}
                        {workflows.map((w) => (
                            <div key={w._id} className="bg-[#161b27] border border-[#1e2130] rounded-xl p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-medium text-white mb-1">{w.name}</p>
                                        <p className="text-xs text-gray-500 mb-3">Trigger: <span className="text-blue-400">{w.trigger}</span></p>
                                        <div className="flex flex-wrap gap-2">
                                            {w.steps.map((step, index) => (
                                                <div key={index} className="flex items-center gap-1">
                                                    <span className="text-xs bg-[#0f1117] border border-[#1e2130] text-gray-300 px-2 py-1 rounded-md">
                                                        {step}
                                                    </span>
                                                    {index < w.steps.length - 1 && (
                                                        <span className="text-gray-600 text-xs">→</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleWorkflow(w._id, w.isActive)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0
                                            ${w.isActive ? 'bg-blue-600' : 'bg-gray-700'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                            ${w.isActive ? 'translate-x-6' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </div>
                                <div className="mt-3 pt-3 border-t border-[#1e2130] flex items-center gap-2">
                                    <span className={`w-1.5 h-1.5 rounded-full ${w.isActive ? 'bg-green-500' : 'bg-gray-600'}`} />
                                    <span className="text-xs text-gray-500">{w.isActive ? 'Active — listening for events' : 'Inactive — paused'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Workflows;