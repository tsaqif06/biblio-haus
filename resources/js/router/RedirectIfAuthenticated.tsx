import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../api/auth";

export default function RedirectIfAuthenticated({
    children,
}: {
    children: JSX.Element;
}) {
    const token = localStorage.getItem("auth_token");
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        if (token) {
            getProfile()
                .then((res) => setRole(res.role))
                .catch(() => setRole("guest"));
        } else {
            setRole("guest");
        }
    }, []);

    if (role === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-50 to-white">
                <div className="bg-white shadow-xl rounded-2xl p-10 flex flex-col items-center">
                    <div className="animate-spin border-4 border-green-600 border-t-transparent rounded-full w-12 h-12 mb-4"></div>
                    <p className="text-gray-700 font-medium">Memuat...</p>
                </div>
            </div>
        );
    }

    if (role === "admin") return <Navigate to="/admin" replace />;
    if (role === "user") return <Navigate to="/user" replace />;

    return children; // guest → boleh akses halaman public
}
