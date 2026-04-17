import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

// attach token
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token); // 🔍 debug

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

// handle errors
API.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {

            if (!window.location.pathname.includes("login")) {
                alert("Session expired. Please login again 🔐");
            }

            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        return Promise.reject(err);
    }
);

export default API;