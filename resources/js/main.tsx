import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginUser from "./pages/LoginUser";
import LoginAdmin from "./pages/LoginAdmin";
import Register from "./pages/Register";
import UserView from "./pages/UserView";
import AdminView from "./pages/AdminView";

import ProtectedRoute from "./router/ProtectedRoute";
import AdminRoute from "./router/AdminRoute";
import UserRoute from "./router/UserRoute";

import "./index.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <>
        <Toaster position="bottom-right" richColors closeButton />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/login" element={<LoginUser />} />
                <Route path="/login/admin" element={<LoginAdmin />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/user/*"
                    element={
                        <ProtectedRoute>
                            <UserRoute>
                                <UserView />
                            </UserRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/*"
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
    </>
);
