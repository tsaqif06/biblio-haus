import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import { registerUser } from "../api/auth";

export default function RegisterPage() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [nisn, setNisn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Password dan konfirmasi tidak sama");
      return;
    }

    if (!nisn.trim()) {
      setError("NISN wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const res = await registerUser({
        name,
        nisn,
        email,
        password,
        role: "user",
      });

      localStorage.setItem("register_success", "Akun berhasil dibuat! Silahkan Login");
      nav("/login");
    } catch (err: any) {
      setError("Registrasi gagal, mungkin email sudah digunakan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-green-50">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-600 p-3 rounded-xl">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mt-4">Register</h1>
        </div>

        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded-lg mb-4">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <Input placeholder="NISN" value={nisn} onChange={(e) => setNisn(e.target.value)} />
          <Input placeholder="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <div className="relative">
            <Input
              placeholder="Password"
              type={showPass ? "text" : "password"}
              className="pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <EyeOff /> : <Eye />}
            </div>
          </div>

          <Input
            placeholder="Konfirmasi Password"
            type={showPass ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <Button className="w-full" disabled={loading}>
            {loading ? "Memproses..." : "Register"}
          </Button>

          <Button type="button" variant="outline" className="w-full" onClick={() => nav("/login")}>
            Kembali
          </Button>
        </form>
      </div>
    </div>
  );
}
