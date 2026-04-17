import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        try {
            setLoading(true);

            const res = await API.post("/auth/login", {
                email,
                password
            });

            if (!res.data.token) {
                alert("No token received ❌");
                return;
            }

            localStorage.setItem("token", res.data.token);

            alert("Login successful ✅");

            navigate("/");

        } catch (err) {
            console.error("LOGIN ERROR:", err);
            alert(err.response?.data?.message || "Login failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">

            <div className="bg-white p-8 rounded-xl shadow-lg w-80">

                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-3 text-black"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4 text-black"
                />

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className={`w-full p-2 rounded font-semibold text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* ✅ ADD THIS */}
                <p className="text-center mt-4 text-sm">
                    Don't have an account?{" "}
                    <span
                        className="text-blue-500 cursor-pointer font-semibold"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>

            </div>
        </div>
    );
}

export default Login;