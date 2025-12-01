import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import Button from "../components/Button";
import Input from "../components/Input";
import { Library, Eye, EyeOff } from "lucide-react";

export default function LoginAdmin() {
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = await login(email, password);

            if (data.user.role !== "admin") {
                setError("Akses ditolak (bukan admin)");
                return;
            }

            nav("/admin");
        } catch (err) {
            setError("Email atau password salah");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="min-h-screen relative flex items-center justify-center px-6 
                        bg-linear-to-br from-green-100 via-green-50 to-white"
        >
            {/* Background noise */}
            <div
                className="absolute inset-0 opacity-10 
                            bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"
            ></div>

            <div className="relative bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-green-600 p-3 rounded-xl">
                        <Library className="w-8 h-8 text-white" />
                    </div>

                    <h1 className="text-3xl font-bold mt-4 text-gray-900">
                        Admin Login
                    </h1>

                    <p className="text-gray-600 text-sm">
                        Masuk sebagai administrator
                    </p>
                </div>

                {error && (
                    <p className="text-red-600 bg-red-100 p-2 rounded-lg mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <Input
                        placeholder="Email Admin"
                        type="email"
                        className="w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Password */}
                    <div className="relative">
                        <Input
                            placeholder="Password"
                            type={showPass ? "text" : "password"}
                            className="w-full pr-12"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* Eye toggle */}
                        <div
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer 
                                       text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </div>
                    </div>

                    <Button className="w-full" disabled={loading}>
                        {loading ? "Memproses..." : "Login"}
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => nav("/")}
                    >
                        Kembali
                    </Button>
                </form>
            </div>
        </div>
    );
}
