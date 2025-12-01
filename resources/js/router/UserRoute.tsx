import { Navigate } from "react-router-dom";
import { getProfile } from "../api/auth";
import { useEffect, useState } from "react";

export default function UserRoute({ children }: { children: JSX.Element }) {
    const [allowed, setAllowed] = useState<boolean | null>(null);

    useEffect(() => {
        getProfile()
            .then((res) => {
                setAllowed(res.role === "user");
            })
            .catch(() => setAllowed(false));
    }, []);

    if (allowed === null)  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-50 to-white">
        <div className="bg-white shadow-xl rounded-2xl p-10 flex flex-col items-center">
          <div className="animate-spin border-4 border-green-600 border-t-transparent rounded-full w-12 h-12 mb-4"></div>
          <p className="text-gray-700 font-medium">Memeriksa hak akses...</p>
        </div>
      </div>
    );

    return allowed ? children : <Navigate to="/login" replace />;
}
