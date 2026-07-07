import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import { Link } from "react-router-dom";

const BusinessData = ({
    embedded = false,
    onSuccess
}) => {
    const [loading, setLoading] = useState(true);

    const [dataSource, setDataSource] = useState({
        type: "manual",
        productCount: 0
    });

    useEffect(() => {
        fetchDataSource();
    }, []);

    const fetchDataSource = async () => {
        try {
            const res = await API.get("/data-source");
            setDataSource(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
const saveDataSource = async () => {

    try {

        await API.put("/data-source", {
            type: dataSource.type
        });

        if (!embedded) {
            alert("Business Data Source Updated");
        }

        return true;

    } catch (error) {

        console.error(error);
        return false;

    }

};

    const isDatabaseConnected = dataSource.type === "manual";

    return (
                <div className="flex min-h-screen bg-[#0f1117]">

            {!embedded && <Sidebar />}

            <main className="flex-1 p-6">

                <h1 className="text-3xl font-bold text-white mb-2">
                    Business Data
                </h1>

                <p className="text-gray-400 mb-8">
                    Choose where SewaFlow should read your business data from.
                </p>

                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : (

                    <div className="bg-[#161b27] border border-[#1e2130] rounded-xl p-6 max-w-3xl">

                        <h2 className="text-white font-semibold text-lg mb-6">
                            Data Source
                        </h2>

                        {/* Manual Database */}

                        <label className="flex items-start gap-4 cursor-pointer border border-[#1e2130] rounded-lg p-4 hover:border-blue-500 transition">

                            <input
                                type="radio"
                                value="manual"
                                checked={dataSource.type === "manual"}
                                onChange={(e) =>
                                    setDataSource({
                                        ...dataSource,
                                        type: e.target.value
                                    })
                                }
                            />

                            <div className="flex-1">

                                <p className="text-white font-medium">
                                    SewaFlow Database
                                </p>

                                <p className="text-gray-500 text-sm mt-1">
                                    Store your products directly inside SewaFlow.
                                </p>

                            </div>

                        </label>

                        {/* Coming Soon Sources */}

                        <div className="space-y-4 mt-6">

                            <label className="flex items-center gap-3 opacity-50">
                                <input type="radio" disabled />
                                <div>
                                    <p className="text-white">Google Sheets</p>
                                    <p className="text-gray-500 text-sm">
                                        Coming Soon
                                    </p>
                                </div>
                            </label>

                            <label className="flex items-center gap-3 opacity-50">
                                <input type="radio" disabled />
                                <div>
                                    <p className="text-white">Excel / CSV</p>
                                    <p className="text-gray-500 text-sm">
                                        Coming Soon
                                    </p>
                                </div>
                            </label>

                            <label className="flex items-center gap-3 opacity-50">
                                <input type="radio" disabled />
                                <div>
                                    <p className="text-white">Shopify</p>
                                    <p className="text-gray-500 text-sm">
                                        Coming Soon
                                    </p>
                                </div>
                            </label>

                            <label className="flex items-center gap-3 opacity-50">
                                <input type="radio" disabled />
                                <div>
                                    <p className="text-white">Custom API</p>
                                    <p className="text-gray-500 text-sm">
                                        Coming Soon
                                    </p>
                                </div>
                            </label>

                        </div>

                        {/* Status */}

                        <div className="mt-8 border-t border-[#1e2130] pt-6">

                            <h3 className="text-white font-semibold mb-4">
                                Current Status
                            </h3>

                            <div className="bg-[#0f1117] rounded-lg border border-[#1e2130] p-5 space-y-4">

                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Selected Source
                                    </span>

                                    <span className="text-white">
                                        SewaFlow Database
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Connection
                                    </span>

                                    <span
                                        className={
                                            isDatabaseConnected
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }
                                    >
                                        {isDatabaseConnected
                                            ? "Connected"
                                            : "Disconnected"}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Products Available
                                    </span>

                                    <span className="text-white font-semibold">
                                        {dataSource.productCount || 0}
                                    </span>
                                </div>

                            </div>

                            {/* Helper */}

                            {(dataSource.productCount || 0) === 0 ? (

                                <div className="mt-5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">

                                    <p className="text-yellow-400 font-medium">
                                        No products found
                                    </p>

                                    <p className="text-gray-400 text-sm mt-2">
                                        Add products first so workflows can
                                        automatically read and update your
                                        inventory.
                                    </p>

                                    <Link
                                        to="/products"
                                        className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white"
                                    >
                                        Go to Products
                                    </Link>

                                </div>

                            ) : (

                                <div className="mt-5 bg-green-500/10 border border-green-500/20 rounded-lg p-4">

                                    <p className="text-green-400 font-medium">
                                        Your database is ready for automation.
                                    </p>

                                    <p className="text-gray-400 text-sm mt-2">
                                        Workflows will use your Products
                                        automatically.
                                    </p>

                                </div>

                            )}

                        </div>

                    <div className="flex justify-end mt-8">

    <button
        onClick={async () => {

            await saveDataSource();

            if (embedded && onNext) {
                onNext();
            }

        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
    >
        {embedded ? "Continue" : "Save Changes"}
    </button>

</div>

                    </div>

                )}

            </main>

        </div>
    );
};

export default BusinessData;