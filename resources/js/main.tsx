import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import LoginUser from "./pages/LoginUser";
import LoginAdmin from "./pages/LoginAdmin";
import Register from "./pages/Register";

import UserView from "./pages/UserView";
import AdminView from "./pages/AdminView";

import ProtectedRoute from "./router/ProtectedRoute";
import AdminRoute from "./router/AdminRoute";
import UserRoute from "./router/UserRoute";
import RedirectIfAuthenticated from "./router/RedirectIfAuthenticated";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            <Route
                path="/"
                element={
                    <RedirectIfAuthenticated>
                        <App />
                    </RedirectIfAuthenticated>
                }
            />

            <Route
                path="/login"
                element={
                    <RedirectIfAuthenticated>
                        <LoginUser />
                    </RedirectIfAuthenticated>
                }
            />

            <Route
                path="/login/admin"
                element={
                    <RedirectIfAuthenticated>
                        <LoginAdmin />
                    </RedirectIfAuthenticated>
                }
            />

            <Route
                path="/register"
                element={
                    <RedirectIfAuthenticated>
                        <Register />
                    </RedirectIfAuthenticated>
                }
            />

            {/* USER PROTECTION */}
            <Route
                path="/user"
                element={
                    <ProtectedRoute>
                        <UserRoute>
                            <UserView />
                        </UserRoute>
                    </ProtectedRoute>
                }
            />

            {/* ADMIN PROTECTION */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminRoute>
                            <AdminView />
                        </AdminRoute>
                    </ProtectedRoute>
                }
            />
        </Routes>
    </BrowserRouter>
);
