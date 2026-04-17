import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 🔐 Protected Route
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <Routes>

            {/* 🔓 Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 🔐 Protected Route */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <App />
                    </ProtectedRoute>
                }
            />

            {/* ❌ Unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />

        </Routes>
    </BrowserRouter>
);