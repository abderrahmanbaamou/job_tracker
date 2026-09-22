import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/applications",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("API DATA:", data);

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
          }

          alert(data.message || "Error loading applications");
          return;
        }

        // Backend retourne directement un tableau
        const apps = Array.isArray(data) ? data : [];

        console.log("APPLICATIONS:", apps);
        console.log("COUNT:", apps.length);

        // ✅ Ici on met les applications récupérées
        setApplications(apps);

      } catch (error) {
        console.error("FETCH ERROR:", error);
        alert("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-xl text-slate-600">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <Link
            to="/dashboard"
            className="text-2xl font-bold"
          >
            JobTracker
          </Link>

          <div className="flex gap-3">

            <Link
              to="/dashboard"
              className="px-4 py-2 hover:bg-slate-800 rounded-lg"
            >
              Dashboard
            </Link>

            <Link to="/job-match"
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg">
                Job Match
                </Link>
                
            <Link
              to="/applications/add"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              + Application
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              Logout
            </button>

          </div>
        </div>
      </div>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* TITLE */}
        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Dashboard
            </h1>

            <p className="text-slate-500 mt-2">
              Manage your job applications
            </p>
          </div>

          <Link
            to="/applications/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            + Add Application
          </Link>

        </div>

        {/* TOTAL */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">

          <p className="text-slate-500 text-lg">
            Total Applications
          </p>

          <p className="text-5xl font-bold text-blue-600 mt-2">
            {applications.length}
          </p>

        </div>

        {/* APPLICATIONS */}
        {applications.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

            <h2 className="text-2xl font-bold text-slate-900">
              No applications yet
            </h2>

            <p className="text-slate-500 mt-2">
              Start by adding your first job application.
            </p>

            <Link
              to="/applications/add"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Add Application
            </Link>

          </div>

        ) : (

          <div>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              My Applications
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {applications.map((application) => (

                <div
                  key={application.id}
                  className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition"
                >

                  <div className="flex justify-between items-start gap-3">

                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {application.company}
                      </h3>

                      <p className="text-slate-500 mt-1">
                        {application.position}
                      </p>
                    </div>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                      {application.status}
                    </span>

                  </div>

                  {application.location && (
                    <p className="text-slate-500 mt-4">
                      📍 {application.location}
                    </p>
                  )}

                  {application.application_date && (
                    <p className="text-slate-500 mt-2">
                      📅 {application.application_date}
                    </p>
                  )}

                  <Link
                    to={`/applications/${application.id}`}
                    className="block text-center mt-6 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 rounded-lg transition"
                  >
                    View Details
                  </Link>

                </div>

              ))}

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default Dashboard;