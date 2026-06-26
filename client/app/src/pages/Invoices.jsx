import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../api/axios';

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await API.get('/invoices');
                setInvoices(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    return (
        <div className="flex min-h-screen bg-[#0f1117]">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-xl font-semibold text-white">Invoices</p>
                    <span className="text-xs text-gray-500 bg-[#161b27] border border-[#1e2130] px-3 py-1.5 rounded-lg">
                        {invoices.length} total
                    </span>
                </div>

                {loading ? (
                    <p className="text-gray-500 text-sm">Loading...</p>
                ) : (
                    <div className="flex gap-4">
                        <div className="flex-1 bg-[#161b27] border border-[#1e2130] rounded-xl overflow-hidden">
                            <div className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-[#1e2130]">
                                <span className="text-xs text-gray-500 font-medium">Invoice</span>
                                <span className="text-xs text-gray-500 font-medium">Items</span>
                                <span className="text-xs text-gray-500 font-medium">Amount</span>
                                <span className="text-xs text-gray-500 font-medium">Status</span>
                            </div>

                            {invoices.length === 0 && (
                                <p className="text-sm text-gray-500 p-4">No invoices yet</p>
                            )}

                            {invoices.map((inv, index) => (
                                <div
                                    key={inv._id}
                                    onClick={() => setSelected(inv)}
                                    className={`grid grid-cols-4 gap-4 px-4 py-3 border-b border-[#1e2130] cursor-pointer transition
                                        ${selected?._id === inv._id ? 'bg-blue-600/10' : 'hover:bg-[#0f1117]'}`}
                                >
                                    <span className="text-sm text-gray-300">#INV-{String(index + 1).padStart(3, '0')}</span>
                                    <span className="text-sm text-gray-400">{inv.items.length} items</span>
                                    <span className="text-sm font-medium text-white">₹{inv.totalAmount}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full w-fit ${
                                        inv.status === 'paid' ? 'bg-green-500/10 text-green-400' :
                                        inv.status === 'cancelled' ? 'bg-red-500/10 text-red-400' :
                                        'bg-yellow-500/10 text-yellow-400'
                                    }`}>
                                        {inv.status}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {selected && (
                            <div className="w-72 bg-[#161b27] border border-[#1e2130] rounded-xl p-4 h-fit">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-sm font-medium text-white">Invoice details</p>
                                    <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white text-xs">✕</button>
                                </div>

                                <div className="flex flex-col gap-2 mb-4">
                                    {selected.items.map((item, i) => (
                                        <div key={i} className="flex justify-between items-center py-2 border-b border-[#1e2130]">
                                            <div>
                                                <p className="text-sm text-gray-300">{item.name}</p>
                                                <p className="text-xs text-gray-500">{item.qty} {item.unit} × ₹{item.pricePerUnit}</p>
                                            </div>
                                            <span className="text-sm font-medium text-white">₹{item.total}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-sm text-gray-400">Total</span>
                                    <span className="text-base font-semibold text-white">₹{selected.totalAmount}</span>
                                </div>

                                <div className="mt-4 pt-4 border-t border-[#1e2130]">
                                    <p className="text-xs text-gray-500">
                                        Created: {new Date(selected.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Invoices;