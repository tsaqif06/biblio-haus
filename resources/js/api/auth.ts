import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
});

// LOGIN
export async function login(email: string, password: string) {
    const res = await api.post("/login", { email, password });

    const token = res.data.token;

    localStorage.setItem("auth_token", token);

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return res.data;
}

// GET PROFILE
export async function getProfile() {
    const token = localStorage.getItem("auth_token");

    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const res = await api.get("/profile");
    return res.data;
}

// LOGOUT
export async function logout() {
    const res = await api.post("/logout");
    localStorage.removeItem("auth_token");
    return res.data;
}

export default api;
