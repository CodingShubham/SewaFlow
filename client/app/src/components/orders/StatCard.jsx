const StatCard = ({ title, value }) => {

    return (

        <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">

            <p className="text-sm text-slate-400">

                {title}

            </p>

            <h2 className="mt-3 text-3xl font-bold text-white">

                {value}

            </h2>

        </div>

    );

};

export default StatCard;