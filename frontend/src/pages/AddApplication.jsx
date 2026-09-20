import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddApplication() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "applied",
    location: "",
    application_date: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addApplication = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      console.log("ADD APPLICATION:", data);

      if (!response.ok) {
        alert(data.message || "Failed to add application");
        return;
      }

      alert("Application added successfully");

      navigate("/dashboard");

    } catch (error) {
      console.error("ADD APPLICATION ERROR:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12">

      <div className="max-w-2xl mx-auto px-6">

        <div className="bg-white rounded-2xl shadow-sm p-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Add Application
          </h1>

          <p className="text-slate-500 mt-2">
            Add a new job application
          </p>

          <form
            onSubmit={addApplication}
            className="mt-8 space-y-5"
          >

            {/* Company */}

            <div>
              <label className="block mb-2 font-medium">
                Company
              </label>

              <input
                name="company"
                placeholder="Company name"
                value={form.company}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Position */}

            <div>
              <label className="block mb-2 font-medium">
                Position
              </label>

              <input
                name="position"
                placeholder="Job position"
                value={form.position}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Status */}

            <div>
              <label className="block mb-2 font-medium">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none"
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
                <option value="accepted">Accepted</option>
              </select>
            </div>

            {/* Location */}

            <div>
              <label className="block mb-2 font-medium">
                Location
              </label>

              <input
                name="location"
                placeholder="Casablanca, Rabat..."
                value={form.location}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date */}

            <div>
              <label className="block mb-2 font-medium">
                Application Date
              </label>

              <input
                type="date"
                name="application_date"
                value={form.application_date}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none"
              />
            </div>

            {/* Notes */}

            <div>
              <label className="block mb-2 font-medium">
                Notes
              </label>

              <textarea
                name="notes"
                placeholder="Add some notes..."
                value={form.notes}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 h-32 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Buttons */}

            <div className="flex gap-3 pt-3">

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="w-1/2 border border-slate-300 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 rounded-lg font-semibold"
              >
                {loading ? "Adding..." : "Add Application"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddApplication;