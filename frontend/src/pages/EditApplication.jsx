import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditApplication() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "applied",
    location: "",
    application_date: "",
    notes: "",
  });

  useEffect(() => {

    const getApplication = async () => {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/applications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        navigate("/dashboard");
        return;
      }

      console.log("EDIT APPLICATION:", data);

      setForm(data);

    };

    getApplication();

  }, [id, navigate]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const updateApplication = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/applications/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Application updated");

    navigate(`/applications/${id}`);

  };

  return (
    <div className="min-h-screen bg-slate-100 py-12">

      <div className="max-w-2xl mx-auto px-6">

        <div className="bg-white p-8 rounded-2xl shadow-sm">

          <h1 className="text-3xl font-bold">
            Edit Application
          </h1>

          <form
            onSubmit={updateApplication}
            className="mt-8 space-y-5"
          >

            <input
              name="company"
              value={form.company || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              name="position"
              value={form.position || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

            <select
              name="status"
              value={form.status || "applied"}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="rejected">Rejected</option>
              <option value="accepted">Accepted</option>
            </select>

            <input
              name="location"
              value={form.location || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="date"
              name="application_date"
              value={form.application_date || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

            <textarea
              name="notes"
              value={form.notes || ""}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 h-32"
            />

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              Save Changes
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditApplication;