import { useEffect, useState } from "react";
import API from "../api/axios";
import StatusBadge from "../components/orders/StatusBadge";
import ApprovalButtons from "../components/orders/ApprovalButtons";
import { Link } from "react-router-dom";
import StatCard from "../components/orders/StatCard";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const pendingOrders = orders.filter(
    (order) => order.approvalStatus === "pending"
);
    const [stats, setStats] = useState({

    totalOrders: 0,

    pendingOrders: 0,

    approvedOrders: 0,

    rejectedOrders: 0,

    revenue: 0

});

            useEffect(() => {

            fetchOrders();

            fetchStats();

        }, []);

    const fetchOrders = async () => {

        try {

            const token = localStorage.getItem("token");

         const response = await API.get("/orders");

            setOrders(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };


    const fetchStats = async () => {

    try {

        const token = localStorage.getItem("token");

    const response = await API.get("/orders/stats");

        setStats(response.data);

    }

    catch (error) {

        console.error(error);

    }

};

const refreshOrders = () => {

    fetchOrders();

    fetchStats();

};

    if (loading) {

        return (

            <div className="p-10 text-white">

                Loading Orders...

            </div>

        );

    }

    return (

        <div className="p-8">

            <h1 className="mb-8 text-3xl font-bold text-white">

                Orders

            </h1>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">

    <StatCard

        title="Total Orders"

        value={stats.totalOrders}

    />

    <StatCard

        title="Pending"

        value={stats.pendingOrders}

    />

    <StatCard

        title="Approved"

        value={stats.approvedOrders}

    />

    <StatCard

        title="Rejected"

        value={stats.rejectedOrders}

    />

    <StatCard

        title="Revenue"

        value={`₹${stats.revenue}`}

    />

</div>


        {pendingOrders.length > 0 && (

    <div className="mb-8 rounded-2xl border border-yellow-600/30 bg-[#111827] p-6">

        <div className="mb-6 flex items-center justify-between">

            <div>

                <h2 className="text-xl font-semibold text-white">

                    Pending Approval

                </h2>

                <p className="mt-1 text-sm text-slate-400">

                    These orders are waiting for your approval.

                </p>

            </div>

            <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-sm font-medium text-yellow-400">

                {pendingOrders.length} Pending

            </span>

        </div>

        <div className="space-y-4">

            {pendingOrders.map((order) => (

                <div
                    key={order._id}
                    className="flex items-center justify-between rounded-xl border border-slate-700 bg-[#0F172A] p-4"
                >

                    <div>

                        <p className="font-medium text-white">

                            {order.customerId?.phone}

                        </p>

                        <p className="mt-1 text-sm text-slate-400">

                            ₹{order.totalAmount}

                        </p>

                    </div>

                    <ApprovalButtons

                        order={order}

                        onRefresh={refreshOrders}

                    />

                </div>

            ))}

        </div>

    </div>

)}

            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111827]">

                <table className="w-full">

                    <thead>

                        <tr className="border-b border-slate-800">

                            <th className="p-4 text-left text-slate-400">
                                Customer
                            </th>

                            <th className="p-4 text-left text-slate-400">
                                Amount
                            </th>

                            <th className="p-4 text-left text-slate-400">
                                Status
                            </th>

                            <th className="p-4 text-left text-slate-400">
                                Approval
                            </th>

                            <th className="p-4 text-left text-slate-400">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {orders.map((order) => (

                            <tr
                                key={order._id}
                                className="border-b border-slate-800"
                            >

                                <td className="p-4 text-white">

                                   <Link
    to={`/orders/${order._id}`}
    className="text-blue-400 hover:underline"
>
    {order.customerId?.phone}
</Link>

                                </td>

                                <td className="p-4 text-white">

                                    ₹{order.totalAmount}

                                </td>

                                <td className="p-4">

                                    <StatusBadge value={order.status} />

                                </td>

                                <td className="p-4">

                                    <StatusBadge value={order.approvalStatus} />

                                </td>

                                <td className="p-4">

                                   <ApprovalButtons

    order={order}

    onRefresh={refreshOrders}

/>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default Orders;