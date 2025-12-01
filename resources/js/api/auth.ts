import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
});

// AMBIL TOKEN DARI LOCALSTORAGE → setiap refresh tetap login
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// LOGIN
export async function login(email: string, password: string) {
    const res = await api.post("/login", { email, password });

    const token = res.data.token;

    localStorage.setItem("auth_token", token);

    return res.data;
}

// REGISTER
export async function registerUser(payload: {
    name: string;
    nisn: string;
    email: string;
    password: string;
    role?: string;
}) {
    const res = await api.post("/register", payload);
    return res.data;
}

// GET PROFILE (cek role user)
export async function getProfile() {
    const res = await api.get("/profile");
    return res.data.user;
}

// LOGOUT
export async function logout() {
    localStorage.removeItem("auth_token");
    return api.post("/logout");
}

export default api;
