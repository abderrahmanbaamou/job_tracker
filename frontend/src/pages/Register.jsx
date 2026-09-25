import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "candidate"
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
            >

                <h1 className="text-3xl font-bold mb-6">
                    Create Account
                </h1>

                <input
                    name="name"
                    placeholder="Full name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                <label className="block font-semibold mb-2">
                    I am:
                </label>

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-6"
                >
                    <option value="candidate">
                        Candidate
                    </option>

                    <option value="professional">
                        Professional / Recruiter
                    </option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-black text-white p-3 rounded-lg"
                >
                    Create Account
                </button>

            </form>

        </div>
    );
}

export default Register;