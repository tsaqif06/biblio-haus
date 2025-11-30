import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import Button from "../components/Button";
import Input from "../components/Input";
import { Library } from "lucide-react";

export default function LoginAdmin() {
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
            const data = await login(email, password);

            if (data.user.role !== "admin") {
                setError("Akses ditolak (bukan admin)");
                return;
            }

            nav("/admin"); // redirect admin
        } catch (err) {
            setError("Email atau password salah");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
            <div className="bg-gray-800 shadow-xl rounded-2xl p-10 w-full max-w-md border border-gray-700">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-gray-700 p-3 rounded-xl">
                        <Library className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold mt-4 text-white">
                        Admin Login
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Hanya untuk administrator
                    </p>
                </div>

                {error && (
                    <p className="text-red-500 bg-red-900/30 p-2 rounded-lg mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        placeholder="Email Admin"
                        type="email"
                        className="w-full bg-gray-700 text-white border-gray-600"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        placeholder="Password"
                        type="password"
                        className="w-full bg-gray-700 text-white border-gray-600"
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
            </div>
        </div>
    );
}
