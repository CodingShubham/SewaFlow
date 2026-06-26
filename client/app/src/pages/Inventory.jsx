import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../api/axios';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        itemName: '', quantity: '', unit: '', pricePerUnit: '', lowStockThreshold: ''
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await API.get('/inventory');
            setItems(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/inventory', form);
            setItems([res.data, ...items]);
            setForm({ itemName: '', quantity: '', unit: '', pricePerUnit: '', lowStockThreshold: '' });
            setShowForm(false);
        } catch (err) {
            console.error(err);
        }
    };

    const inputClass = "w-full bg-[#0f1117] border border-[#1e2130] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600";

    return (
        <div className="flex min-h-screen bg-[#0f1117]">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-xl font-semibold text-white">Inventory</p>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        + Add Item
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleAdd} className="bg-[#161b27] border border-[#1e2130] rounded-xl p-4 mb-4 grid grid-cols-5 gap-3 items-end">
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Item name</label>
                            <input className={inputClass} placeholder="Sugar" value={form.itemName} onChange={e => setForm({ ...form, itemName: e.target.value })} required />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Quantity</label>
                            <input className={inputClass} type="number" placeholder="100" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} required />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Unit</label>
                            <input className={inputClass} placeholder="kg" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} required />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Price/unit (₹)</label>
                            <input className={inputClass} type="number" placeholder="45" value={form.pricePerUnit} onChange={e => setForm({ ...form, pricePerUnit: e.target.value })} required />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Low stock at</label>
                            <input className={inputClass} type="number" placeholder="10" value={form.lowStockThreshold} onChange={e => setForm({ ...form, lowStockThreshold: e.target.value })} />
                        </div>
                        <div className="col-span-5 flex gap-2 justify-end">
                            <button type="button" onClick={() => setShowForm(false)} className="text-sm text-gray-400 hover:text-white px-4 py-2 rounded-lg transition">Cancel</button>
                            <button type="submit" className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">Save Item</button>
                        </div>
                    </form>
                )}

                {loading ? (
                    <p className="text-gray-500 text-sm">Loading...</p>
                ) : (
                    <div className="bg-[#161b27] border border-[#1e2130] rounded-xl overflow-hidden">
                        <div className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-[#1e2130]">
                            <span className="text-xs text-gray-500 font-medium">Item</span>
                            <span className="text-xs text-gray-500 font-medium">Quantity</span>
                            <span className="text-xs text-gray-500 font-medium">Unit</span>
                            <span className="text-xs text-gray-500 font-medium">Price/unit</span>
                            <span className="text-xs text-gray-500 font-medium">Status</span>
                        </div>

                        {items.length === 0 && (
                            <p className="text-sm text-gray-500 p-4">No items yet — add your first item</p>
                        )}

                        {items.map((item) => (
                            <div key={item._id} className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-[#1e2130] hover:bg-[#0f1117] transition items-center">
                                <span className="text-sm text-gray-300 font-medium">{item.itemName}</span>
                                <span className="text-sm text-gray-300">{item.quantity}</span>
                                <span className="text-sm text-gray-400">{item.unit}</span>
                                <span className="text-sm text-gray-300">₹{item.pricePerUnit}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full w-fit ${
                                    item.quantity <= item.lowStockThreshold
                                        ? 'bg-red-500/10 text-red-400'
                                        : 'bg-green-500/10 text-green-400'
                                }`}>
                                    {item.quantity <= item.lowStockThreshold ? 'Low stock' : 'In stock'}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Inventory;