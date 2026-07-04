import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ArrowLeft } from "lucide-react";
import { getWorkflow, updateWorkflow } from "../services/workflowService";
import ConfigurationRenderer from "../components/configuration/ConfigurationRenderer";

const EditWorkflow = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [workflow, setWorkflow] = useState(null);

    const [configuration, setConfiguration] = useState({});

    useEffect(() => {

        loadWorkflow();

    }, []);

    const loadWorkflow = async () => {

        try {

            const data = await getWorkflow(id);

            setWorkflow(data);

            setConfiguration(data.config);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    const handleSave = async () => {

        try {

            await updateWorkflow(id, {

                config: configuration

            });

            navigate(`/workflows/${id}`);

        }

        catch (error) {

            console.log(error);

        }

    };



    if (loading) {

        return (

            <div className="flex min-h-screen bg-[#0f1117]">

                <Sidebar />

                <main className="flex-1 p-8 text-white">

                    Loading...

                </main>

            </div>

        );

    }

    return (

        <div className="flex min-h-screen bg-[#0f1117]">

            <Sidebar />

            <main className="flex-1 p-8">

                <button

                    onClick={() => navigate(`/workflows/${id}`)}

                    className="flex items-center gap-2 text-slate-400 hover:text-white"

                >

                    <ArrowLeft size={18} />

                    Back

                </button>

                <div className="mt-8">

                    <h1 className="text-4xl font-bold text-white">

                        Edit Workflow

                    </h1>

                    <p className="text-slate-400 mt-3">

                        Update your automation configuration.

                    </p>

                </div>

                <div className="mt-10">

                    <ConfigurationRenderer

                        template={{

                            id: workflow.template

                        }}

                        value={configuration}

                        onChange={setConfiguration}

                    />

                </div>

                <div className="flex justify-end mt-10">

                    <button

                        onClick={handleSave}

                        className="rounded-xl bg-blue-600 hover:bg-blue-500 px-8 py-3 text-white font-semibold"

                    >

                        Save Changes

                    </button>

                </div>

            </main>

        </div>

    );

};

export default EditWorkflow;