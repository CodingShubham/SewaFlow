import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../api/axios';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await API.get('/customers');
                setCustomers(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    const getInitials = (phone) => {
        return phone ? phone.slice(-2) : 'NA';
    };

    const colors = [
        'bg-blue-500/20 text-blue-400',
        'bg-green-500/20 text-green-400',
        'bg-purple-500/20 text-purple-400',
        'bg-orange-500/20 text-orange-400',
        'bg-pink-500/20 text-pink-400',
    ];

    return (
        <div className="flex min-h-screen bg-[#0f1117]">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-xl font-semibold text-white">Customers</p>
                    <span className="text-xs text-gray-500 bg-[#161b27] border border-[#1e2130] px-3 py-1.5 rounded-lg">
                        {customers.length} total
                    </span>
                </div>

                {loading ? (
                    <p className="text-gray-500 text-sm">Loading...</p>
                ) : (
                    <div className="bg-[#161b27] border border-[#1e2130] rounded-xl overflow-hidden">
                        <div className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-[#1e2130]">
                            <span className="text-xs text-gray-500 font-medium">Customer</span>
                            <span className="text-xs text-gray-500 font-medium">Phone</span>
                            <span className="text-xs text-gray-500 font-medium">Total Orders</span>
                            <span className="text-xs text-gray-500 font-medium">Joined</span>
                        </div>

                        {customers.length === 0 && (
                            <p className="text-sm text-gray-500 p-4">No customers yet</p>
                        )}

                        {customers.map((customer, index) => (
                            <div key={customer._id} className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-[#1e2130] hover:bg-[#0f1117] transition items-center">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${colors[index % colors.length]}`}>
                                        {getInitials(customer.phone)}
                                    </div>
                                    <span className="text-sm text-gray-300">
                                        {customer.name || 'Unknown'}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-300">+{customer.phone}</span>
                                <span className="text-sm text-gray-300">{customer.totalOrders}</span>
                                <span className="text-xs text-gray-500">
                                    {new Date(customer.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Customers;