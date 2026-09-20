import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-400"
        >
          JobTracker
        </Link>

        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="hover:text-blue-400"
          >
            Home
          </Link>

          {token ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-blue-400"
              >
                Dashboard
              </Link>

              <Link
                to="/applications/new"
                className="hover:text-blue-400"
              >
                Add Application
              </Link>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-400"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;