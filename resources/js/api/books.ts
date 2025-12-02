import api from "./auth";

export async function getBooks() {
    const res = await api.get("/books");
    return res.data;
}

export async function getBooksUser() {
    const res = await api.get("/booksuser");
    return res.data;
}

export async function getBook(id: number) {
    const res = await api.get(`/books/${id}`);
    return res.data;
}

export async function createBook(payload: FormData) {
    const res = await api.post("/books", payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
}

export async function updateBook(id: number, payload: FormData) {
    const res = await api.post(`/books/${id}?_method=PUT`, payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
}

export async function deleteBook(id: number) {
    const res = await api.delete(`/books/${id}`);
    return res.data;
}
