import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Account created successfully");

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert("Server error");

    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center">
          Create account
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Start tracking your job applications
        </p>

        <form
          onSubmit={register}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Your name"
              required
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="you@example.com"
              required
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="••••••••"
              required
            />

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Create account
          </button>

        </form>

        <p className="text-center text-slate-500 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;