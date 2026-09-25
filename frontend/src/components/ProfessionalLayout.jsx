import { Link, Outlet } from "react-router-dom";

function ProfessionalLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">

            {/* Navbar */}
            <nav className="bg-black text-white px-8 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">

                    <Link
                        to="/professional/dashboard"
                        className="text-xl font-bold"
                    >
                        JobTracker
                    </Link>

                    <div className="flex gap-6">
                        <Link to="/professional/dashboard">
                            Dashboard
                        </Link>

                        <Link to="/professional/jobs/add">
                            Add Job
                        </Link>

                        <Link to="/professional/jobs">
                            My Jobs
                        </Link>
                    </div>

                </div>
            </nav>


            {/* Page content */}
            <main className="flex-1">
                <Outlet />
            </main>


            {/* Footer */}
            <footer className="bg-black text-white mt-auto">

                <div className="max-w-7xl mx-auto px-8 py-8">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div>
                            <h2 className="text-xl font-bold mb-3">
                                JobTracker
                            </h2>

                            <p className="text-gray-400">
                                Manage your job offers and find the
                                right candidates easily.
                            </p>
                        </div>


                        <div>
                            <h3 className="font-semibold mb-3">
                                Professional
                            </h3>

                            <div className="flex flex-col gap-2 text-gray-400">

                                <Link
                                    to="/professional/dashboard"
                                    className="hover:text-white"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/professional/jobs/add"
                                    className="hover:text-white"
                                >
                                    Add Job
                                </Link>

                                <Link
                                    to="/professional/jobs"
                                    className="hover:text-white"
                                >
                                    My Jobs
                                </Link>

                            </div>
                        </div>


                        <div>
                            <h3 className="font-semibold mb-3">
                                Contact
                            </h3>

                            <p className="text-gray-400">
                                Email: contact@jobtracker.com
                            </p>

                            <p className="text-gray-400 mt-2">
                                Morocco
                            </p>
                        </div>

                    </div>


                    <div className="border-t border-gray-700 mt-8 pt-5 text-center text-gray-500">
                        © 2026 JobTracker. All rights reserved.
                    </div>

                </div>

            </footer>

        </div>
    );
}

export default ProfessionalLayout;