import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddJob() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        company: "",
        location: "",
        description: "",
        requirements: "",
        salary: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:5000/api/jobs",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert("Job created successfully");

        navigate("/professional/dashboard");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow"
            >

                <h1 className="text-3xl font-bold mb-6">
                    Create Job Offer
                </h1>

                <input
                    name="title"
                    placeholder="Job title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                <input
                    name="company"
                    placeholder="Company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                <input
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                <input
                    name="salary"
                    placeholder="Salary"
                    value={form.salary}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                <textarea
                    name="description"
                    placeholder="Job description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4 h-32"
                />

                <textarea
                    name="requirements"
                    placeholder="Requirements"
                    value={form.requirements}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-6 h-32"
                />

                <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded-lg"
                >
                    Create Job
                </button>

            </form>

        </div>
    );
}

export default AddJob;