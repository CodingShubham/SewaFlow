import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const OrderDetails = () => {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {

        try {

            const res = await API.get(`/orders/${id}`);

            setOrder(res.data);

        }

        catch (err) {

            console.error(err);

        }

    };

    if (!order) {

        return (
            <div className="p-8 text-white">
                Loading...
            </div>
        );

    }

    return (

        <div className="p-8 text-white space-y-6">

            <h1 className="text-3xl font-bold">
                {order.orderNumber}
            </h1>

            <div className="rounded-xl bg-[#111827] p-5 space-y-2">

                <p>
                    <strong>Customer :</strong>{" "}
                    {order.customerName || "Unknown"}
                </p>

                <p>
                    <strong>Phone :</strong>{" "}
                    {order.customerPhone}
                </p>

                <p>
                    <strong>Status :</strong>{" "}
                    {order.status}
                </p>

                <p>
                    <strong>Approval :</strong>{" "}
                    {order.approvalStatus}
                </p>

                <p>
                    <strong>Source :</strong>{" "}
                    {order.source}
                </p>

                <p>
                    <strong>Total :</strong> ₹{order.totalAmount}
                </p>

            </div>

            <div className="rounded-xl bg-[#111827] p-5">

                <h2 className="font-semibold mb-3">
                    Original Customer Message
                </h2>

                <div className="rounded bg-slate-900 p-4 text-slate-300">

                    {order.rawMessage || "No message stored"}

                </div>

            </div>

            <div className="rounded-xl bg-[#111827] p-5">

                <h2 className="font-semibold mb-3">
                    Ordered Items
                </h2>

                {order.items.map((item, index) => (

                    <div
                        key={index}
                        className="border-b border-slate-700 py-2 flex justify-between"
                    >

                        <span>
                            {item.name}
                        </span>

                        <span>
                            {item.qty} {item.unit}
                        </span>

                    </div>

                ))}

            </div>

            <div className="rounded-xl bg-[#111827] p-5">

                <h2 className="font-semibold mb-3">

                    Timeline

                </h2>

                {order.timeline.map((event, index) => (

                    <div
                        key={index}
                        className="border-b border-slate-700 py-3"
                    >

                        <div className="font-medium">
                            {event.event}
                        </div>

                        <div className="text-sm text-slate-400">
                            {event.note}
                        </div>

                        <div className="text-xs text-slate-500">
                            {new Date(event.at).toLocaleString()}
                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default OrderDetails;