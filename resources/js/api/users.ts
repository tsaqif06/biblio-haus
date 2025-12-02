import api from "./auth";

export async function getUsers() {
    const res = await api.get("/users");
    return res.data;
}

export async function getUser(id: number) {
    const res = await api.get(`/users/${id}`);
    return res.data;
}

export async function createUser(payload: FormData) {
    const res = await api.post("/users", payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
}

export async function updateUser(id: number, payload: FormData) {
    const res = await api.post(`/users/${id}?_method=PUT`, payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
}

export async function deleteUser(id: number) {
    const res = await api.delete(`/users/${id}`);
    return res.data;
}
