import { useState } from "react";

function CVAnalyzer() {

  const [file, setFile] =
    useState(null);

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  const analyzeCV = async (e) => {

    e.preventDefault();


    if (!file) {

      alert(
        "Please select a PDF file"
      );

      return;
    }


    setLoading(true);
    setResult(null);


    try {

      const formData =
        new FormData();


      formData.append(
        "file",
        file
      );


      const response = await fetch(
        "http://localhost:5000/api/ml/analyze-cv",
        {
          method: "POST",
          body: formData,
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "CV analysis error"
        );

        return;
      }


      setResult(data);


      // Save skills for recommendations

      localStorage.setItem(
        "userSkills",
        data.skills.join(", ")
      );


    } catch (error) {

      console.error(error);

      alert(
        "CV analyzer error"
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
            CV Analyzer
          </h1>

          <p className="text-slate-500 mt-2">
            Upload your CV and extract your skills.
          </p>


          <form
            onSubmit={analyzeCV}
            className="mt-8"
          >

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setFile(
                  e.target.files[0]
                )
              }
              className="w-full border border-slate-300 rounded-lg p-4 bg-white"
            />


            {file && (

              <p className="mt-3 text-slate-600">

                Selected file:

                <span className="font-semibold ml-1">
                  {file.name}
                </span>

              </p>

            )}


            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white py-3 rounded-lg font-semibold"
            >

              {loading
                ? "Analyzing CV..."
                : "Analyze CV"}

            </button>

          </form>


          {/* RESULTS */}

          {result && (

            <div className="mt-10">

              <div className="bg-green-50 rounded-2xl p-6">

                <h2 className="text-xl font-bold text-green-700">
                  CV analyzed successfully
                </h2>

                <p className="text-slate-600 mt-2">
                  Your detected skills:
                </p>


                <div className="flex flex-wrap gap-2 mt-4">

                  {result.skills.length > 0 ? (

                    result.skills.map(
                      (skill) => (

                        <span
                          key={skill}
                          className="bg-green-100 text-green-700 px-3 py-2 rounded-full text-sm"
                        >
                          {skill}
                        </span>

                      )
                    )

                  ) : (

                    <p className="text-slate-500">
                      No known technical skills detected.
                    </p>

                  )}

                </div>

              </div>


              {/* EXTRACTED TEXT */}

              <div className="mt-8">

                <h2 className="text-xl font-bold text-slate-900">
                  Extracted CV Text
                </h2>

                <div className="mt-4 bg-slate-50 rounded-xl p-5 max-h-96 overflow-y-auto">

                  <pre className="whitespace-pre-wrap text-sm text-slate-700">
                    {result.text}
                  </pre>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default CVAnalyzer;