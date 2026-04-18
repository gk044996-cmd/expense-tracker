import axios from "axios";

// ✅ YOUR RENDER BACKEND URL
const BASE_URL = "https://expense-tracker-backend-egiz.onrender.com/api";

const API = axios.create({
    baseURL: BASE_URL
});

// ================= TOKEN ATTACH =================
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

// ================= ERROR HANDLING =================
API.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {

            if (!window.location.pathname.includes("login")) {
                alert("Session expired. Please login again 🔐");
                window.location.href = "/login";
            }

            localStorage.removeItem("token");
        }

        return Promise.reject(err);
    }
);

export default API;