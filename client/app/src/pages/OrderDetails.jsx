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

            const token = localStorage.getItem("token");

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

        <div className="p-8 text-white">

            <h1 className="text-3xl font-bold mb-8">

                Order Details

            </h1>

            <div className="space-y-4">

                <p>

                    <strong>Customer:</strong> {order.customerId?.phone}

                </p>

                <p>

                    <strong>Status:</strong> {order.status}

                </p>

                <p>

                    <strong>Approval:</strong> {order.approvalStatus}

                </p>

                <p>

                    <strong>Total:</strong> ₹{order.totalAmount}

                </p>

                <div>

                    <strong>Items</strong>

                    <div className="mt-3 space-y-2">

                        {order.items.map((item, index) => (

                            <div
                                key={index}
                                className="rounded-lg bg-[#111827] p-3"
                            >

                                {item.name}

                                {" × "}

                                {item.qty}

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    );

};

export default OrderDetails;