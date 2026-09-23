import { useEffect, useState } from "react";

function Recommendations() {

  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const loadRecommendations =
      async () => {

        try {

          const userSkills =
            localStorage.getItem(
              "userSkills"
            );


          if (!userSkills) {

            alert(
              "Analyze your CV first."
            );

            setLoading(false);

            return;
          }


          // Get jobs

          const jobsResponse =
            await fetch(
              "http://localhost:5000/api/jobs"
            );


          const jobsData =
            await jobsResponse.json();


          if (!jobsResponse.ok) {

            alert(
              jobsData.message ||
              "Error loading jobs"
            );

            return;
          }


          // Calculate match for every job

          const recommendations =
            await Promise.all(

              jobsData.map(
                async (job) => {

                  const response =
                    await fetch(
                      "http://localhost:5000/api/ml/match",
                      {
                        method: "POST",

                        headers: {
                          "Content-Type":
                            "application/json",
                        },

                        body:
                          JSON.stringify({

                            skills:
                              userSkills,

                            job_description:
                              job.description,

                          }),
                      }
                    );


                  const match =
                    await response.json();


                  return {

                    ...job,

                    score:
                      match.score,

                    message:
                      match.message,

                    matched_skills:
                      match.matched_skills,

                    missing_skills:
                      match.missing_skills,

                  };

                }
              )
            );


          // Sort highest score first

          recommendations.sort(
            (a, b) =>
              b.score - a.score
          );


          setJobs(
            recommendations
          );


        } catch (error) {

          console.error(error);

          alert(
            "Error loading recommendations"
          );


        } finally {

          setLoading(false);

        }
      };


    loadRecommendations();

  }, []);


  if (loading) {

    return (

      <div className="min-h-screen bg-slate-100 flex items-center justify-center">

        <p className="text-xl text-slate-600">
          Analyzing jobs...
        </p>

      </div>

    );
  }


  return (

    <div className="min-h-screen bg-slate-100 py-12">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-slate-900">
          Recommended Jobs
        </h1>

        <p className="text-slate-500 mt-2">
          Jobs ranked according to your CV skills.
        </p>


        {jobs.length === 0 ? (

          <div className="bg-white rounded-2xl p-10 text-center mt-8">

            <h2 className="text-2xl font-bold">
              No recommendations
            </h2>

            <p className="text-slate-500 mt-2">
              Analyze your CV first.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

            {jobs.map((job) => (

              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-sm p-6"
              >

                <div className="flex justify-between items-start gap-3">

                  <div>

                    <h2 className="text-xl font-bold text-slate-900">
                      {job.title}
                    </h2>

                    <p className="text-slate-500 mt-1">
                      {job.company}
                    </p>

                  </div>


                  <span
                    className={
                      job.score >= 70
                        ? "bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold"
                        : job.score >= 40
                        ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold"
                        : "bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold"
                    }
                  >
                    {job.score}%
                  </span>

                </div>


                {job.location && (

                  <p className="text-slate-500 mt-4">
                    📍 {job.location}
                  </p>

                )}


                <p className="text-slate-600 mt-4">
                  {job.description}
                </p>


                <div className="mt-5">

                  <p className="font-semibold text-green-600">
                    Matched skills
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">

                    {job.matched_skills?.map(
                      (skill) => (

                        <span
                          key={skill}
                          className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>

                      )
                    )}

                  </div>

                </div>


                {job.missing_skills?.length > 0 && (

                  <div className="mt-4">

                    <p className="font-semibold text-red-600">
                      Missing skills
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">

                      {job.missing_skills.map(
                        (skill) => (

                          <span
                            key={skill}
                            className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>

                        )
                      )}

                    </div>

                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Recommendations;