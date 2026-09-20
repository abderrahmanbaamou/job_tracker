import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/applications/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("APPLICATION DETAILS:", data);

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
          }

          setApplication(null);
          return;
        }

        setApplication(data);

      } catch (error) {
        console.error("DETAIL ERROR:", error);
        setApplication(null);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-xl text-slate-600">
          Loading...
        </p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">

          <h1 className="text-3xl font-bold text-slate-900">
            Application not found
          </h1>

          <Link
            to="/dashboard"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Dashboard
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <header className="bg-slate-900 text-white">
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

            <Link
              to="/applications/add"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              + Application
            </Link>

          </div>

        </div>
      </header>


      {/* MAIN */}
      <main className="max-w-4xl mx-auto px-6 py-12">

        <Link
          to="/dashboard"
          className="text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </Link>


        <div className="bg-white rounded-2xl shadow-sm p-8 mt-6">

          <div className="flex justify-between items-start">

            <div>

              <h1 className="text-4xl font-bold text-slate-900">
                {application.company}
              </h1>

              <p className="text-xl text-slate-500 mt-2">
                {application.position}
              </p>

            </div>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              {application.status}
            </span>

          </div>


          <div className="border-t mt-8 pt-8 space-y-5">

            {application.location && (
              <div>
                <p className="text-sm text-slate-400">
                  Location
                </p>

                <p className="text-lg text-slate-800">
                  📍 {application.location}
                </p>
              </div>
            )}


            {application.application_date && (
              <div>
                <p className="text-sm text-slate-400">
                  Application Date
                </p>

                <p className="text-lg text-slate-800">
                  📅 {application.application_date}
                </p>
              </div>
            )}


            {application.notes && (
              <div>
                <p className="text-sm text-slate-400">
                  Notes
                </p>

                <p className="text-lg text-slate-800 whitespace-pre-wrap">
                  {application.notes}
                </p>
              </div>
            )}

          </div>


          <div className="border-t mt-8 pt-6 flex gap-3">

            <Link
              to={`/applications/${application.id}/edit`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Edit
            </Link>

            <button
              onClick={async () => {

                const confirmDelete = window.confirm(
                  "Are you sure you want to delete this application?"
                );

                if (!confirmDelete) {
                  return;
                }

                const token = localStorage.getItem("token");

                try {

                  const response = await fetch(
                    `http://localhost:5000/api/applications/${application.id}`,
                    {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  const data = await response.json();

                  if (!response.ok) {
                    alert(data.message || "Delete failed");
                    return;
                  }

                  alert("Application deleted successfully");

                  navigate("/dashboard");

                } catch (error) {

                  console.error(error);
                  alert("Server error");

                }

              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
            >
              Delete
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default ApplicationDetails;