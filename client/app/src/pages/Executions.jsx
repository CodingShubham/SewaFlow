import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../api/axios';

const Executions = () => {
    const [executions, setExecutions] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExecutions = async () => {
            try {
                const res = await API.get('/executions');
                setExecutions(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchExecutions();
    }, []);

    return (
        <div className="flex min-h-screen bg-[#0f1117]">
            <Sidebar />
            <main className="flex-1 p-6">
                <p className="text-xl font-semibold text-white mb-6">Executions</p>

                {loading ? (
                    <p className="text-gray-500 text-sm">Loading...</p>
                ) : (
                    <div className="flex gap-4">

                        {/* Executions list */}
                        <div className="flex-1 bg-[#161b27] border border-[#1e2130] rounded-xl overflow-hidden">
                            <div className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-[#1e2130]">
                                <span className="text-xs text-gray-500 font-medium">Workflow</span>
                                <span className="text-xs text-gray-500 font-medium">Status</span>
                                <span className="text-xs text-gray-500 font-medium">Steps</span>
                                <span className="text-xs text-gray-500 font-medium">Started</span>
                            </div>

                            {executions.length === 0 && (
                                <p className="text-sm text-gray-500 p-4">No executions yet</p>
                            )}

                            {executions.map((ex) => (
                                <div
                                    key={ex._id}
                                    onClick={() => setSelected(ex)}
                                    className={`grid grid-cols-4 gap-4 px-4 py-3 border-b border-[#1e2130] cursor-pointer transition
                                        ${selected?._id === ex._id ? 'bg-blue-600/10' : 'hover:bg-[#0f1117]'}`}
                                >
                                    <span className="text-sm text-gray-300">whatsapp_order</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full w-fit ${
                                        ex.status === 'success' ? 'bg-green-500/10 text-green-400' :
                                        ex.status === 'failed' ? 'bg-red-500/10 text-red-400' :
                                        'bg-yellow-500/10 text-yellow-400'
                                    }`}>
                                        {ex.status}
                                    </span>
                                    <span className="text-sm text-gray-400">{ex.logs.length} steps</span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(ex.startedAt).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Step logs panel */}
                        {selected && (
                            <div className="w-80 bg-[#161b27] border border-[#1e2130] rounded-xl p-4 flex flex-col gap-3 h-fit">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium text-white">Step logs</p>
                                    <button
                                        onClick={() => setSelected(null)}
                                        className="text-gray-500 hover:text-white text-xs"
                                    >
                                        ✕ Close
                                    </button>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {selected.logs.map((log, index) => (
                                        <div key={index} className="bg-[#0f1117] rounded-lg p-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-xs font-medium text-gray-300">{log.step}</span>
                                                <span className={`text-xs px-1.5 py-0.5 rounded ${
                                                    log.status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                                                }`}>
                                                    {log.status}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-500">{log.durationMs}ms</span>
                                            {log.error && (
                                                <p className="text-xs text-red-400 mt-1">{log.error}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-[#1e2130] pt-3">
                                    <p className="text-xs text-gray-500">
                                        Started: {new Date(selected.startedAt).toLocaleString()}
                                    </p>
                                    {selected.finishedAt && (
                                        <p className="text-xs text-gray-500">
                                            Finished: {new Date(selected.finishedAt).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </main>
        </div>
    );
};

export default Executions;