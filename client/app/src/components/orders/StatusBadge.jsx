const colors = {

    pending: "bg-yellow-500/20 text-yellow-400",

    confirmed: "bg-green-500/20 text-green-400",

    completed: "bg-blue-500/20 text-blue-400",

    cancelled: "bg-red-500/20 text-red-400",

    approved: "bg-green-500/20 text-green-400",

    rejected: "bg-red-500/20 text-red-400"

};

const StatusBadge = ({ value }) => {

    return (

        <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${colors[value] || "bg-slate-700 text-white"}`}
        >
            {value}
        </span>

    );

};

export default StatusBadge;