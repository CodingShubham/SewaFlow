import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../api/axios';

const Products = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        name: '',
        sku: '',
        category: '',
        description: '',
        price: '',
        stock: '',
        unit: '',
        lowStockThreshold: '',
        image: '',
        active: true
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await API.get('/products');
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
            const res = await API.post('/products', form);

            setItems([res.data, ...items]);

            setForm({
                name: '',
                sku: '',
                category: '',
                description: '',
                price: '',
                stock: '',
                unit: '',
                lowStockThreshold: '',
                image: '',
                active: true
            });

            setShowForm(false);

        } catch (err) {
            console.error(err);
        }
    };

    const inputClass =
        "w-full bg-[#0f1117] border border-[#1e2130] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600";

    return (
        <div className="flex min-h-screen bg-[#0f1117]">
            <Sidebar />

            <main className="flex-1 p-6">

                <div className="flex justify-between items-center mb-6">
                    <p className="text-xl font-semibold text-white">
                        Products
                    </p>

                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        + Add Product
                    </button>
                </div>

                {showForm && (

                    <form
                        onSubmit={handleAdd}
                        className="bg-[#161b27] border border-[#1e2130] rounded-xl p-4 mb-4 grid grid-cols-5 gap-3 items-end"
                    >

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">
                                Product Name
                            </label>

                            <input
                                className={inputClass}
                                placeholder="Sugar"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">
                                SKU
                            </label>

                            <input
                                className={inputClass}
                                placeholder="SKU001"
                                value={form.sku}
                                onChange={(e) =>
                                    setForm({ ...form, sku: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">
                                Category
                            </label>

                            <input
                                className={inputClass}
                                placeholder="Groceries"
                                value={form.category}
                                onChange={(e) =>
                                    setForm({ ...form, category: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">
                                Price (₹)
                            </label>

                            <input
                                className={inputClass}
                                type="number"
                                placeholder="50"
                                value={form.price}
                                onChange={(e) =>
                                    setForm({ ...form, price: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">
                                Stock
                            </label>

                            <input
                                className={inputClass}
                                type="number"
                                placeholder="100"
                                value={form.stock}
                                onChange={(e) =>
                                    setForm({ ...form, stock: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">
                                Unit
                            </label>

                            <input
                                className={inputClass}
                                placeholder="kg"
                                value={form.unit}
                                onChange={(e) =>
                                    setForm({ ...form, unit: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">
                                Low Stock
                            </label>

                            <input
                                className={inputClass}
                                type="number"
                                placeholder="10"
                                value={form.lowStockThreshold}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        lowStockThreshold: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div className="col-span-3 flex gap-2 justify-end">

                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="text-sm text-gray-400 hover:text-white px-4 py-2 rounded-lg transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                Save Product
                            </button>

                        </div>

                    </form>

                )}

                {loading ? (

                    <p className="text-gray-500 text-sm">
                        Loading...
                    </p>

                ) : (

                    <div className="bg-[#161b27] border border-[#1e2130] rounded-xl overflow-hidden">

                        <div className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-[#1e2130]">

                            <span className="text-xs text-gray-500 font-medium">
                                Product
                            </span>

                            <span className="text-xs text-gray-500 font-medium">
                                Stock
                            </span>

                            <span className="text-xs text-gray-500 font-medium">
                                Unit
                            </span>

                            <span className="text-xs text-gray-500 font-medium">
                                Price
                            </span>

                            <span className="text-xs text-gray-500 font-medium">
                                Status
                            </span>

                        </div>

                        {items.length === 0 && (

                            <p className="text-sm text-gray-500 p-4">
                                No products yet — add your first product
                            </p>

                        )}

                        {items.map((item) => (

                            <div
                                key={item._id}
                                className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-[#1e2130] hover:bg-[#0f1117] transition items-center"
                            >

                                <span className="text-sm text-gray-300 font-medium">
                                    {item.name}
                                </span>

                                <span className="text-sm text-gray-300">
                                    {item.stock}
                                </span>

                                <span className="text-sm text-gray-400">
                                    {item.unit}
                                </span>

                                <span className="text-sm text-gray-300">
                                    ₹{item.price}
                                </span>

                                <span
                                    className={`text-xs px-2 py-0.5 rounded-full w-fit ${
                                        item.stock <= item.lowStockThreshold
                                            ? 'bg-red-500/10 text-red-400'
                                            : 'bg-green-500/10 text-green-400'
                                    }`}
                                >
                                    {item.stock <= item.lowStockThreshold
                                        ? 'Low Stock'
                                        : 'In Stock'}
                                </span>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
};

export default Products;