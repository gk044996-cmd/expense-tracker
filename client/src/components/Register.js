import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const handleRegister = async () => {
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match ❌");
            return;
        }

        try {
            await API.post("/auth/register", {
                name: form.name,
                email: form.email,
                password: form.password
            });

            alert("Registered successfully ✅");
            navigate("/login");

        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow w-80">

                <h2 className="text-xl mb-4">Register</h2>

                <input placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-2 border mb-2" />

                <input placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full p-2 border mb-2" />

                <input type="password" placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full p-2 border mb-2" />

                <input type="password" placeholder="Confirm Password"
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="w-full p-2 border mb-2" />

                <button onClick={handleRegister}
                    className="bg-green-500 text-white w-full p-2">
                    Register
                </button>

            </div>
        </div>
    );
}

export default Register;