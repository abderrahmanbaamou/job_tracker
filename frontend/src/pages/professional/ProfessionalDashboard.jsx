import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProfessionalDashboard() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        const fetchJobs = async () => {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/jobs/my-jobs",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setJobs(data.jobs);
            }
        };

        fetchJobs();

    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center mb-8">

                    <div>
                        <h1 className="text-3xl font-bold">
                            Professional Dashboard
                        </h1>

                        <p className="text-gray-500">
                            Manage your job offers
                        </p>
                    </div>

                    <Link
                        to="/professional/jobs/add"
                        className="bg-black text-white px-5 py-3 rounded-lg"
                    >
                        + Add Job
                    </Link>

                </div>


                <div className="grid md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-gray-500">
                            Total Jobs
                        </p>

                        <p className="text-3xl font-bold">
                            {jobs.length}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-gray-500">
                            Applications
                        </p>

                        <p className="text-3xl font-bold">
                            0
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-gray-500">
                            Candidates
                        </p>

                        <p className="text-3xl font-bold">
                            0
                        </p>
                    </div>

                </div>


                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-xl font-bold mb-5">
                        My Job Offers
                    </h2>

                    {jobs.length === 0 ? (

                        <p className="text-gray-500">
                            You haven't created any job offer yet.
                        </p>

                    ) : (

                        <div className="space-y-4">

                            {jobs.map((job) => (

                                <div
                                    key={job.id}
                                    className="border rounded-lg p-5 flex justify-between"
                                >

                                    <div>
                                        <h3 className="font-bold text-lg">
                                            {job.title}
                                        </h3>

                                        <p className="text-gray-500">
                                            {job.company}
                                        </p>

                                        <p className="text-sm text-gray-400">
                                            {job.location}
                                        </p>
                                    </div>

                                    <Link
                                        to={`/professional/jobs/edit/${job.id}`}
                                        className="text-blue-600"
                                    >
                                        Edit
                                    </Link>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default ProfessionalDashboard;