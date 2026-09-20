import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>

            <p className="text-blue-600 font-semibold mb-4">
              JOB APPLICATION TRACKER
            </p>

            <h1 className="text-5xl font-bold text-slate-900 leading-tight">
              Organize your job search
              <span className="text-blue-600">
                {" "}easily.
              </span>
            </h1>

            <p className="text-lg text-slate-600 mt-6">
              JobTracker helps you manage all your job applications
              in one place. Track companies, positions, statuses
              and notes without losing anything.
            </p>

            <div className="flex gap-4 mt-8">

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="border border-slate-300 hover:bg-slate-100 px-6 py-3 rounded-lg font-semibold"
              >
                Login
              </Link>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">

            <div className="bg-slate-900 rounded-xl p-6 text-white">

              <p className="text-slate-400">
                Your job search
              </p>

              <h2 className="text-4xl font-bold mt-2">
                Organized.
              </h2>

              <div className="grid grid-cols-2 gap-4 mt-8">

                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="text-slate-400">
                    Applications
                  </p>

                  <p className="text-3xl font-bold">
                    12
                  </p>
                </div>

                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="text-slate-400">
                    Interviews
                  </p>

                  <p className="text-3xl font-bold">
                    4
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center">
            Everything you need
          </h2>

          <p className="text-center text-slate-500 mt-3">
            Keep your job search organized and simple.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">

            <div className="p-6 rounded-xl border">
              <h3 className="text-xl font-bold">
                Track Applications
              </h3>

              <p className="text-slate-600 mt-3">
                Keep all your job applications in one place.
              </p>
            </div>

            <div className="p-6 rounded-xl border">
              <h3 className="text-xl font-bold">
                Follow Status
              </h3>

              <p className="text-slate-600 mt-3">
                Know if an application is applied, interview,
                rejected or accepted.
              </p>
            </div>

            <div className="p-6 rounded-xl border">
              <h3 className="text-xl font-bold">
                Add Notes
              </h3>

              <p className="text-slate-600 mt-3">
                Save useful information about every application.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-slate-900 text-white py-8">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <p>
            © 2026 JobTracker. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;