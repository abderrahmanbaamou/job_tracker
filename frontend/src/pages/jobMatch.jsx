import { useState } from "react";

function JobMatch() {

  const [skills, setSkills] =
    useState("");

  const [jobDescription, setJobDescription] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  const checkMatch = async (e) => {

    e.preventDefault();

    setLoading(true);
    setResult(null);


    try {

      const response = await fetch(
        "http://localhost:5000/api/ml/match",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            skills,
            job_description:
              jobDescription,
          }),
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "Error"
        );

        return;
      }


      setResult(data);


    } catch (error) {

      console.error(error);

      alert(
        "ML server error"
      );


    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="min-h-screen bg-slate-100 py-12">

      <div className="max-w-4xl mx-auto px-6">

        <div className="bg-white rounded-2xl shadow-sm p-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Job Match
          </h1>

          <p className="text-slate-500 mt-2">
            Compare your skills with a job.
          </p>


          <form
            onSubmit={checkMatch}
            className="mt-8 space-y-6"
          >

            {/* YOUR SKILLS */}

            <div>

              <label className="block font-semibold mb-2">
                Your Skills
              </label>

              <textarea
                value={skills}
                onChange={(e) =>
                  setSkills(
                    e.target.value
                  )
                }
                placeholder="React, Node.js, PostgreSQL, Git..."
                className="w-full border border-slate-300 rounded-lg px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>


            {/* JOB DESCRIPTION */}

            <div>

              <label className="block font-semibold mb-2">
                Job Description
              </label>

              <textarea
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(
                    e.target.value
                  )
                }
                placeholder="Paste the job description here..."
                className="w-full border border-slate-300 rounded-lg px-4 py-3 h-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-400 text-white py-3 rounded-lg font-semibold"
            >
              {loading
                ? "Analyzing..."
                : "Check Match"}
            </button>

          </form>


          {/* RESULT */}

          {result && (

            <div className="mt-10">

              {/* SCORE */}

              <div className="bg-slate-50 rounded-2xl p-8 text-center">

                <p className="text-slate-500">
                  Match Score
                </p>

                <p className="text-6xl font-bold text-purple-600 mt-2">
                  {result.score}%
                </p>

                <p className="text-xl font-semibold mt-3">
                  {result.message}
                </p>

              </div>


              {/* MATCHED */}

              <div className="mt-8">

                <h2 className="text-xl font-bold text-green-600">
                  Matched Skills
                </h2>

                <div className="flex flex-wrap gap-2 mt-4">

                  {result.matched_skills?.length > 0 ? (

                    result.matched_skills.map(
                      (skill) => (

                        <span
                          key={skill}
                          className="bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm"
                        >
                          ✓ {skill}
                        </span>

                      )
                    )

                  ) : (

                    <p className="text-slate-500">
                      No matched skills.
                    </p>

                  )}

                </div>

              </div>


              {/* MISSING */}

              <div className="mt-8">

                <h2 className="text-xl font-bold text-red-600">
                  Missing Skills
                </h2>

                <div className="flex flex-wrap gap-2 mt-4">

                  {result.missing_skills?.length > 0 ? (

                    result.missing_skills.map(
                      (skill) => (

                        <span
                          key={skill}
                          className="bg-red-100 text-red-700 px-3 py-2 rounded-full text-sm"
                        >
                          ✕ {skill}
                        </span>

                      )
                    )

                  ) : (

                    <p className="text-green-600">
                      You have all detected skills.
                    </p>

                  )}

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default JobMatch;