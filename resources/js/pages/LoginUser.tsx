import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import Button from "../components/Button";
import Input from "../components/Input";
import { Library } from "lucide-react";

export default function LoginUser() {
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(email, password);
            nav("/user");
        } catch (err) {
            setError("Email atau password salah");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center px-6 
                        bg-gradient-to-br from-green-100 via-green-50 to-white">

            {/* subtle noise background */}
            <div className="absolute inset-0 opacity-10 
                            bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]">
            </div>

            <div className="relative bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-green-600 p-3 rounded-xl">
                        <Library className="w-8 h-8 text-white" />
                    </div>

                    <h1 className="text-3xl font-bold mt-4 text-gray-900">Login User</h1>
                    <p className="text-gray-600 text-sm">Masuk untuk membaca buku digital</p>
                </div>

                {error && (
                    <p className="text-red-600 bg-red-100 p-2 rounded-lg mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        placeholder="Email"
                        type="email"
                        className="w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        placeholder="Password"
                        type="password"
                        className="w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

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

                {/* Register section */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    Belum punya akun?{" "}
                    <span
                        className="text-green-700 font-semibold cursor-pointer hover:underline"
                        onClick={() => nav("/register")}
                    >
                        Daftar di sini
                    </span>
                </div>
            </div>
        </div>
    );
}
