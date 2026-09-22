import { useState } from "react";

function JobMatch() {

  const [skills, setSkills] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkMatch = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:5000/api/ml/match",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            skills,
            job_description: jobDescription,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setResult(data);

    } catch (error) {

      console.error(error);

      alert("ML server error");

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="min-h-screen bg-slate-100 py-12">

      <div className="max-w-3xl mx-auto px-6">

        <div className="bg-white rounded-2xl shadow-sm p-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Job Match
          </h1>

          <p className="text-slate-500 mt-2">
            Check how well your skills match a job.
          </p>


          <form
            onSubmit={checkMatch}
            className="mt-8 space-y-5"
          >

            <div>

              <label className="block font-semibold mb-2">
                Your Skills
              </label>

              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, Node.js, PostgreSQL..."
                className="w-full border rounded-lg px-4 py-3 h-32"
                required
              />

            </div>


            <div>

              <label className="block font-semibold mb-2">
                Job Description
              </label>

              <textarea
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(e.target.value)
                }
                placeholder="Paste the job description here..."
                className="w-full border rounded-lg px-4 py-3 h-48"
                required
              />

            </div>


            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Analyzing..." : "Check Match"}
            </button>

          </form>


          {result && (

            <div className="mt-8 bg-slate-50 rounded-xl p-6 text-center">

              <p className="text-slate-500">
                Match Score
              </p>

              <p className="text-6xl font-bold text-blue-600 mt-2">
                {result.score}%
              </p>

              <p className="text-xl font-semibold mt-3">
                {result.message}
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default JobMatch;