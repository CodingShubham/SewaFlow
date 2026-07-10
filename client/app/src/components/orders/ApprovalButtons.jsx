import API from "../../api/axios";
import { useState } from "react";
const ApprovalButtons = ({ order, onRefresh }) => {

    const token = localStorage.getItem("token");
const [loading, setLoading] = useState(false);
    const approve = async () => {
   setLoading(true);
        try {

          await API.put(`/orders/${order._id}/approve`);

            onRefresh();

        }

        catch (error) {

            alert(error.response?.data?.message || "Approval failed");

        }


         finally {

        setLoading(false);

    }

    };

    const reject = async () => {

        setLoading(true);
        try {

          await API.put(`/orders/${order._id}/reject`);

            onRefresh();

        }

        catch (error) {

            alert(error.response?.data?.message || "Reject failed");

        }

        finally {

    setLoading(false);

}

    };

    if (order.approvalStatus !== "pending") {

        return null;

    }

    return (

        <div className="flex gap-2">

            <button

                onClick={approve}
                 disabled={loading}
                className="rounded-lg bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"

            >

                {loading ? "Processing..." : "Approve"}

            </button>

            <button

                onClick={reject}
                 disabled={loading}
                className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"

            >

                {loading ? "Processing..." : "Reject"}

            </button>

        </div>

    );

};

export default ApprovalButtons;