import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    User,
    Library,
    ChevronDown,
    ArrowLeft,
    Plus,
    Search,
    Edit,
    Trash2,
    BookOpen,
    Users,
    TrendingUp,
    Eye,
    EyeOff,
    FileText,
    Image as ImageIcon,
} from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

import { logout as apiLogout } from "../api/auth.ts";
import { getBooks, createBook, deleteBook, updateBook } from "../api/books.ts";
import { getUsers, createUser, deleteUser, updateUser } from "../api/users.ts";
import { toast } from "sonner";

interface AdminViewProps {
    onBack: () => void;
}

interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    description: string;
    cover: string;
    pdf_file: string;
    created_at?: string;
    updated_at?: string;
}

interface User {
    id: number;
    nisn: string;
    name: string;
    email: string;
    password?: string;
    role: string;
    profile_photo?: string;
    created_at?: string;
    updated_at?: string;
}

export default function AdminView({ onBack }: AdminViewProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchQueryUser, setSearchQueryUser] = useState("");
    const [books, setBooks] = useState<Book[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfirmModalUser, setShowConfirmModalUser] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAddModalUser, setShowAddModalUser] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showEditModalUser, setShowEditModalUser] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageUser, setCurrentPageUser] = useState(1);
    const [showPass, setShowPass] = useState(false);

    const itemsPerPage = 5;
    const navigate = useNavigate();

    const [newBook, setNewBook] = useState<any>({
        title: "",
        author: "",
        category: "",
        description: "",
        cover: null,
        pdf_file: null,
    });

    const [newUser, setNewUser] = useState<any>({
        nisn: "",
        name: "",
        email: "",
        password: "",
        role: "",
        profile_photo: null,
    });

    const [editBook, setEditBook] = useState<any>({
        id: null,
        title: "",
        author: "",
        category: "",
        description: "",
        cover: null,
        pdf_file: null,
    });

    const [editUser, setEditUser] = useState<any>({
        id: null,
        nisn: "",
        name: "",
        email: "",
        password: "",
        role: "",
        profile_photo: null,
    });

    useEffect(() => {
        fetchBooks();
        fetchUsers();
    }, []);

    const fetchBooks = async () => {
        try {
            setIsLoading(true);
            const data = await getBooks();
            setBooks(data);
        } catch (error) {
            console.error("Gagal mengambil data buku:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            setIsLoadingUser(true);
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Gagal mengambil data user:", error);
        } finally {
            setIsLoadingUser(false);
        }
    };

    const handleLogout = async () => {
        try {
            await apiLogout();
        } catch (error) {
            console.error("Logout gagal di server:", error);
        }

        localStorage.removeItem("auth_token");

        navigate("/");
    };

    const handleEditSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("title", editBook.title);
            formData.append("author", editBook.author);
            formData.append("category", editBook.category);
            formData.append("description", editBook.description);

            if (editBook.cover instanceof File) {
                formData.append("cover", editBook.cover);
            }

            if (editBook.pdf_file instanceof File) {
                formData.append("pdf_file", editBook.pdf_file);
            }

            await updateBook(editBook.id, formData);

            toast.success("Buku berhasil diperbarui!");
            setShowEditModal(false);
            fetchBooks();
        } catch (error) {
            console.error(error);
            toast.error("Gagal memperbarui buku!");
        }
    };

    const handleEditSubmitUser = async () => {
        try {
            const formData = new FormData();
            formData.append("nisn", editUser.nisn);
            formData.append("name", editUser.name);
            formData.append("email", editUser.email);
            formData.append("password", editUser.password);
            formData.append("role", editUser.role);

            if (editUser.profile_photo instanceof File) {
                formData.append("profile_photo", editUser.profile_photo);
            }

            await updateUser(editUser.id, formData);

            toast.success("Data user berhasil diperbarui!");
            setShowEditModalUser(false);
            fetchUsers();
        } catch (error) {
            console.error(error);
            toast.error("Gagal memperbarui data user!");
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedBookId) return;

        try {
            await deleteBook(selectedBookId);
            toast.success("Berhasil menghapus buku!");
            fetchBooks();
        } catch (error) {
            console.error(error);
            toast.error("Gagal menghapus buku!");
        }

        setShowConfirmModal(false);
        setSelectedBookId(null);
    };

    const handleConfirmDeleteUser = async () => {
        if (!selectedUserId) return;

        try {
            await deleteUser(selectedUserId);
            toast.success("Berhasil menghapus user!");
            fetchUsers();
        } catch (error) {
            console.error(error);
            toast.error("Gagal menghapus user!");
        }

        setShowConfirmModalUser(false);
        setSelectedUserId(null);
    };

    const handleAddSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("title", newBook.title);
            formData.append("author", newBook.author);
            formData.append("category", newBook.category);
            formData.append("description", newBook.description);

            if (newBook.cover) {
                formData.append("cover", newBook.cover);
            }

            if (newBook.pdf_file) {
                formData.append("pdf_file", newBook.pdf_file);
            }

            await createBook(formData);
            toast.success("Buku berhasil ditambahkan!");
            setShowAddModal(false);
            fetchBooks();
        } catch (error) {
            console.error("Gagal menambah buku:", error);
            toast.error("Gagal menambahkan buku!");
        }
    };

    const handleAddSubmitUser = async () => {
        try {
            const formData = new FormData();
            formData.append("nisn", newUser.nisn);
            formData.append("name", newUser.name);
            formData.append("email", newUser.email);
            formData.append("password", newUser.password);
            formData.append("role", newUser.role);

            if (newUser.profile_photo) {
                formData.append("profile_photo", newUser.profile_photo);
            }

            await createUser(formData);
            toast.success("User berhasil ditambahkan!");
            setShowAddModalUser(false);
            fetchUsers();
        } catch (error) {
            console.error("Gagal menambah user:", error);
            toast.error("Gagal menambahkan user!");
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setNewBook((prev) => ({ ...prev, [field]: value }));
    };

    const handleInputChangeUser = (field: string, value: string) => {
        setNewUser((prev) => ({ ...prev, [field]: value }));
    };

    const openDeleteConfirm = (id: number) => {
        setSelectedBookId(id);
        setShowConfirmModal(true);
    };

    const openDeleteConfirmUser = (id: number) => {
        setSelectedUserId(id);
        setShowConfirmModalUser(true);
    };

    const openEditModal = (book: Book) => {
        setEditBook({
            id: book.id,
            title: book.title,
            author: book.author,
            category: book.category,
            description: book.description,
            cover: book.cover,
            pdf_file: book.pdf_file,
        });

        setShowEditModal(true);
    };

    const openEditModalUser = (user: User) => {
        setEditUser({
            id: user.id,
            nisn: user.nisn,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            profile_photo: user.profile_photo,
        });
        console.log(user);

        setShowEditModalUser(true);
    };

    const filteredBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQueryUser.toLowerCase()) ||
            (user.nisn ?? "")
                .toLowerCase()
                .includes(searchQueryUser.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQueryUser.toLowerCase())
    );

    const totalBooks = books.length;
    const totalUsers = users.length;
    // const totalBorrowed = "-";
    const totalCategory = Array.from(
        new Set(books.map((book) => book.category))
    ).length;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBooks = filteredBooks.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const startIndexUser = (currentPageUser - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(
        startIndexUser,
        startIndexUser + itemsPerPage
    );

    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
    const totalPagesUser = Math.ceil(filteredUsers.length / itemsPerPage);

    const roleColor = (role: string) => {
        switch (role.toLowerCase()) {
            case "admin":
                return "bg-blue-100 text-blue-700";
            case "user":
                return "bg-green-100 text-green-700";
            default:
                return "bg-green-100 text-green-700";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* LEFT: LOGO + TITLE */}
                    <div className="flex items-center gap-3">
                        <div className="bg-green-600 p-2 rounded-lg">
                            <Library className="w-6 h-6 text-white" />
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Dashboard Admin
                            </h1>
                            <p className="text-xs text-gray-600">
                                Kelola perpustakaan digital
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: PROFILE DROPDOWN */}
                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
                        >
                            <User className="w-5 h-5 text-gray-700" />
                            <span className="text-sm font-medium text-gray-800">
                                Admin
                            </span>
                            <ChevronDown className="w-4 h-4" />
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg py-2 z-50">
                                {/* <button
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                    onClick={() => navigate("/admin/profile")}
                                >
                                    Profil Saya
                                </button> */}

                                <button
                                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Cards - Layout tetap sama, data disesuaikan */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <BookOpen className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">
                            {isLoading ? "..." : totalBooks}
                        </p>
                        <p className="text-gray-600">Total Buku</p>
                        <div className="mt-2 flex items-center gap-1 text-green-600 text-sm">
                            <TrendingUp className="w-4 h-4" />
                            <span>Data Terbaru</span>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">
                            {isLoading ? "..." : totalUsers}
                        </p>
                        <p className="text-gray-600">Status Sistem</p>
                        <div className="mt-2 flex items-center gap-1 text-blue-600 text-sm">
                            <TrendingUp className="w-4 h-4" />
                            <span>Online</span>
                        </div>
                    </Card>

                    {/* <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-orange-100 p-3 rounded-lg">
                                <Eye className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">
                            {totalBorrowed}
                        </p>
                        <p className="text-gray-600">Sedang Dipinjam</p>
                        <div className="mt-2 flex items-center gap-1 text-orange-600 text-sm">
                            <TrendingUp className="w-4 h-4" />
                            <span>Tracking Off</span>
                        </div>
                    </Card> */}

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <Library className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">
                            {isLoading ? "..." : totalCategory}
                        </p>
                        <p className="text-gray-600">Kategori Buku</p>
                        <div className="mt-2 flex items-center gap-1 text-purple-600 text-sm">
                            <TrendingUp className="w-4 h-4" />
                            <span>Tersedia</span>
                        </div>
                    </Card>
                </div>

                <Card className="p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Kelola Koleksi Buku
                            </h2>
                            <p className="text-gray-600">
                                Tambah, edit, atau hapus buku dari perpustakaan
                            </p>
                        </div>
                        <Button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Tambah Buku Baru</span>
                        </Button>
                    </div>

                    <div className="mb-6 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            placeholder="Cari buku..."
                            value={searchQuery}
                            onChange={(e: any) =>
                                setSearchQuery(e.target.value)
                            }
                            className="pl-12"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                        Judul Buku
                                    </th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                        Penulis
                                    </th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                        Kategori
                                    </th>
                                    <th className="text-center py-4 px-4 font-semibold text-gray-700">
                                        Cover
                                    </th>
                                    <th className="text-center py-4 px-4 font-semibold text-gray-700">
                                        File PDF
                                    </th>
                                    <th className="text-center py-4 px-4 font-semibold text-gray-700">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="text-center py-8"
                                        >
                                            Memuat data...
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedBooks.map((book) => (
                                        <tr
                                            key={book.id}
                                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="py-4 px-4">
                                                <p className="font-semibold text-gray-900">
                                                    {book.title}
                                                </p>
                                            </td>
                                            <td className="py-4 px-4 text-gray-600">
                                                {book.author}
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                                    {book.category}
                                                </span>
                                            </td>

                                            <td className="py-4 px-4 text-center">
                                                {book.cover ? (
                                                    <a
                                                        href={`/storage/${book.cover}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex justify-center text-green-600 hover:text-green-800"
                                                    >
                                                        <ImageIcon className="w-5 h-5 cursor-pointer" />
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">
                                                        -
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-4 px-4 text-center">
                                                {book.pdf_file ? (
                                                    <button
                                                        onClick={() =>
                                                            window.open(
                                                                `/read/${book.title
                                                                    .toLowerCase()
                                                                    .replace(
                                                                        /\s+/g,
                                                                        "-"
                                                                    )}`,
                                                                "_blank"
                                                            )
                                                        }
                                                        className="flex justify-center text-blue-600 hover:text-blue-800"
                                                    >
                                                        <FileText className="w-5 h-5 cursor-pointer" />
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">
                                                        -
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-4 px-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            openEditModal(book)
                                                        }
                                                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openDeleteConfirm(
                                                                book.id
                                                            )
                                                        }
                                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <div className="flex justify-between items-center mt-4 border-t pt-4 border-gray-200 px-4">
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                                disabled={currentPage === 1}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                            >
                                Sebelumnya
                            </button>

                            <span className="text-sm text-gray-600">
                                Halaman {currentPage} dari {totalPages}
                            </span>

                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                            >
                                Selanjutnya
                            </button>
                        </div>
                    </div>

                    {!isLoading && filteredBooks.length === 0 && (
                        <div className="text-center py-12">
                            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600">
                                Tidak ada buku yang ditemukan
                            </p>
                        </div>
                    )}
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Populer Books - Diubah menjadi Latest Books karena tidak ada data 'borrowed' */}
                    <Card className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Buku Terbaru
                        </h3>
                        <div className="space-y-4">
                            {books.slice(0, 5).map((book, index) => (
                                <div
                                    key={book.id}
                                    className="flex items-center gap-4"
                                >
                                    <div className="bg-green-100 text-green-700 font-bold w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">
                                            {book.title}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {book.author}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-green-600">
                                            New
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Category Logic */}
                    <Card className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Kategori Buku
                        </h3>
                        <div className="space-y-4">
                            {Array.from(
                                new Set(books.map((b) => b.category))
                            ).map((category, index) => {
                                const categoryCount = books.filter(
                                    (b) => b.category === category
                                ).length;

                                const colors = [
                                    "bg-blue-500",
                                    "bg-green-500",
                                    "bg-purple-500",
                                    "bg-orange-500",
                                    "bg-pink-500",
                                    "bg-indigo-500",
                                ];

                                const percentage =
                                    totalBooks > 0
                                        ? (categoryCount / totalBooks) * 100
                                        : 0;

                                return (
                                    <div key={category}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-gray-900">
                                                {category}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                {categoryCount} judul
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`${
                                                    colors[
                                                        index % colors.length
                                                    ]
                                                } h-3 rounded-full transition-all duration-300`}
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>

                <Card className="p-6 mt-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Kelola User
                            </h2>
                            <p className="text-gray-600">
                                Tambah, edit, atau hapus user
                            </p>
                        </div>
                        <Button
                            onClick={() => setShowAddModalUser(true)}
                            className="flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Tambah User Baru</span>
                        </Button>
                    </div>

                    <div className="mb-6 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            placeholder="Cari user..."
                            value={searchQueryUser}
                            autoComplete="off"
                            onChange={(e: any) =>
                                setSearchQueryUser(e.target.value)
                            }
                            className="pl-12"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                        NISN
                                    </th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                        Nama
                                    </th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                        Email
                                    </th>
                                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                                        Role
                                    </th>
                                    <th className="text-center py-4 px-4 font-semibold text-gray-700">
                                        Foto Profil
                                    </th>
                                    <th className="text-center py-4 px-4 font-semibold text-gray-700">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoadingUser ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="text-center py-8"
                                        >
                                            Memuat data...
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="py-4 px-4">
                                                <p className="font-semibold text-gray-900">
                                                    {user.nisn}
                                                </p>
                                            </td>
                                            <td className="py-4 px-4 text-gray-600">
                                                {user.name}
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                                    {user.email}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${roleColor(
                                                        user.role
                                                    )}`}
                                                >
                                                    {user.role
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        user.role.slice(1)}
                                                </span>
                                            </td>

                                            <td className="py-4 px-4 text-center">
                                                {user.profile_photo ? (
                                                    <a
                                                        href={`/storage/${user.profile_photo}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex justify-center text-green-600 hover:text-green-800"
                                                    >
                                                        <ImageIcon className="w-5 h-5 cursor-pointer" />
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">
                                                        -
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-4 px-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            openEditModalUser(
                                                                user
                                                            )
                                                        }
                                                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openDeleteConfirmUser(
                                                                user.id
                                                            )
                                                        }
                                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <div className="flex justify-between items-center mt-4 border-t pt-4 border-gray-200 px-4">
                            <button
                                onClick={() =>
                                    setCurrentPageUser((prev) =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                                disabled={currentPageUser === 1}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                            >
                                Sebelumnya
                            </button>

                            <span className="text-sm text-gray-600">
                                Halaman {currentPageUser} dari {totalPagesUser}
                            </span>

                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPagesUser)
                                    )
                                }
                                disabled={currentPageUser === totalPagesUser}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                            >
                                Selanjutnya
                            </button>
                        </div>
                    </div>

                    {!isLoadingUser && filteredUsers.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600">
                                Tidak ada user yang ditemukan
                            </p>
                        </div>
                    )}
                </Card>
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
                    <Card className="max-w-2xl w-full p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Tambah Buku Baru
                            </h3>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* JUDUL */}
                            <Input
                                label="Judul Buku"
                                placeholder="Masukkan judul buku"
                                value={newBook.title}
                                onChange={(e: any) =>
                                    handleInputChange("title", e.target.value)
                                }
                            />

                            {/* PENULIS */}
                            <Input
                                label="Penulis"
                                placeholder="Masukkan nama penulis"
                                value={newBook.author}
                                onChange={(e: any) =>
                                    handleInputChange("author", e.target.value)
                                }
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                {/* KATEGORI */}
                                <Input
                                    label="Kategori"
                                    placeholder="Contoh: Matematika"
                                    value={newBook.category}
                                    onChange={(e: any) =>
                                        handleInputChange(
                                            "category",
                                            e.target.value
                                        )
                                    }
                                />

                                {/* COVER FILE */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cover Buku (Gambar)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setNewBook((prev) => ({
                                                ...prev,
                                                cover:
                                                    e.target.files?.[0] || null,
                                            }))
                                        }
                                        className="w-full border-2 border-gray-200 rounded-lg p-2"
                                    />

                                    {/* Preview Optional */}
                                    {newBook.cover &&
                                        typeof newBook.cover !== "string" && (
                                            <p className="text-sm text-green-600 mt-1">
                                                File cover dipilih ✔
                                            </p>
                                        )}
                                </div>
                            </div>

                            {/* FILE PDF */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    File PDF Buku
                                </label>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) =>
                                        setNewBook((prev) => ({
                                            ...prev,
                                            pdf_file:
                                                e.target.files?.[0] || null,
                                        }))
                                    }
                                    className="w-full border-2 border-gray-200 rounded-lg p-2"
                                />

                                {newBook.pdf_file &&
                                    typeof newBook.pdf_file !== "string" && (
                                        <p className="text-sm text-blue-600 mt-1">
                                            File PDF dipilih ✔
                                        </p>
                                    )}
                            </div>

                            {/* DESKRIPSI */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deskripsi
                                </label>
                                <textarea
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                                    rows={4}
                                    placeholder="Masukkan deskripsi buku..."
                                    value={newBook.description}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "description",
                                            e.target.value
                                        )
                                    }
                                ></textarea>
                            </div>

                            {/* BUTTON */}
                            <div className="flex gap-4 pt-4">
                                <Button
                                    className="flex-1 flex items-center justify-center gap-2"
                                    onClick={handleAddSubmit}
                                >
                                    <Plus className="w-5 h-5" />
                                    <span>Simpan Buku</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Batal
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] px-6">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-red-100 text-red-600 p-2 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Konfirmasi Hapus
                            </h3>
                        </div>

                        <p className="text-gray-600 mb-6">
                            Apakah kamu yakin ingin menghapus buku ini? Tindakan
                            ini tidak dapat dibatalkan.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
                    <Card className="max-w-2xl w-full p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Edit Buku
                            </h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* JUDUL */}
                            <Input
                                label="Judul Buku"
                                value={editBook.title}
                                onChange={(e: any) =>
                                    setEditBook({
                                        ...editBook,
                                        title: e.target.value,
                                    })
                                }
                            />

                            {/* PENULIS */}
                            <Input
                                label="Penulis"
                                value={editBook.author}
                                onChange={(e: any) =>
                                    setEditBook({
                                        ...editBook,
                                        author: e.target.value,
                                    })
                                }
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                {/* KATEGORI */}
                                <Input
                                    label="Kategori"
                                    value={editBook.category}
                                    onChange={(e: any) =>
                                        setEditBook({
                                            ...editBook,
                                            category: e.target.value,
                                        })
                                    }
                                />

                                {/* COVER */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cover Buku
                                    </label>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setEditBook({
                                                ...editBook,
                                                cover:
                                                    e.target.files?.[0] ||
                                                    editBook.cover,
                                            })
                                        }
                                        className="w-full border-2 border-gray-200 rounded-lg p-2"
                                    />

                                    {typeof editBook.cover === "string" && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Cover lama: {editBook.cover}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* PDF */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    File PDF
                                </label>

                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) =>
                                        setEditBook({
                                            ...editBook,
                                            pdf_file:
                                                e.target.files?.[0] ||
                                                editBook.pdf_file,
                                        })
                                    }
                                    className="w-full border-2 border-gray-200 rounded-lg p-2"
                                />

                                {typeof editBook.pdf_file === "string" && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        PDF lama: {editBook.pdf_file}
                                    </p>
                                )}
                            </div>

                            {/* DESKRIPSI */}
                            <textarea
                                rows={4}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                                value={editBook.description}
                                onChange={(e) =>
                                    setEditBook({
                                        ...editBook,
                                        description: e.target.value,
                                    })
                                }
                            />

                            {/* BUTTON */}
                            <div className="flex gap-4 pt-4">
                                <Button
                                    onClick={handleEditSubmit}
                                    className="flex-1 flex items-center justify-center gap-2"
                                >
                                    <Edit className="w-5 h-5" />
                                    <span>Simpan Perubahan</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Batal
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {showAddModalUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
                    <Card className="max-w-2xl w-full p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Tambah User Baru
                            </h3>
                            <button
                                onClick={() => setShowAddModalUser(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <Input
                                label="NISN"
                                placeholder="Masukkan NISN"
                                value={newUser.nisn}
                                onChange={(e: any) =>
                                    handleInputChangeUser(
                                        "nisn",
                                        e.target.value
                                    )
                                }
                            />

                            <Input
                                label="Nama"
                                placeholder="Masukkan nama"
                                value={newUser.name}
                                onChange={(e: any) =>
                                    handleInputChangeUser(
                                        "name",
                                        e.target.value
                                    )
                                }
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <Input
                                        placeholder="Masukkan email"
                                        value={newUser.email}
                                        onChange={(e) =>
                                            handleInputChangeUser(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                {/* Password */}
                                <div className="flex flex-col relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <Input
                                        placeholder="Masukkan password"
                                        type={showPass ? "text" : "password"}
                                        className="w-full pr-12"
                                        value={newUser.password}
                                        onChange={(e) =>
                                            handleInputChangeUser(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <div
                                        className="absolute right-3 top-[15px] cursor-pointer text-gray-500 hover:text-gray-700 flex items-center h-full"
                                        onClick={() => setShowPass(!showPass)}
                                    >
                                        {showPass ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Foto Profil
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setNewUser((prev) => ({
                                            ...prev,
                                            profile_photo:
                                                e.target.files?.[0] || null,
                                        }))
                                    }
                                    className="w-full border-2 border-gray-200 rounded-lg p-2"
                                />

                                {newUser.profile_photo &&
                                    typeof newUser.profile_photo !==
                                        "string" && (
                                        <p className="text-sm text-green-600 mt-1">
                                            File foto profil dipilih ✔
                                        </p>
                                    )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Role
                                </label>
                                <select
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                                    value={newUser.role}
                                    onChange={(e) =>
                                        handleInputChangeUser(
                                            "role",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Pilih role</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            {/* BUTTON */}
                            <div className="flex gap-4 pt-4">
                                <Button
                                    className="flex-1 flex items-center justify-center gap-2"
                                    onClick={handleAddSubmitUser}
                                >
                                    <Plus className="w-5 h-5" />
                                    <span>Buat User</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setShowAddModalUser(false)}
                                >
                                    Batal
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {showConfirmModalUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] px-6">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-red-100 text-red-600 p-2 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Konfirmasi Hapus
                            </h3>
                        </div>

                        <p className="text-gray-600 mb-6">
                            Apakah kamu yakin ingin menghapus user ini? Tindakan
                            ini tidak dapat dibatalkan.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirmModalUser(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleConfirmDeleteUser}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModalUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
                    <Card className="max-w-2xl w-full p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Edit User
                            </h3>
                            <button
                                onClick={() => setShowEditModalUser(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <Input
                                label="NISN"
                                value={editUser.nisn}
                                onChange={(e: any) =>
                                    setEditUser({
                                        ...editUser,
                                        nisn: e.target.value,
                                    })
                                }
                            />

                            <Input
                                label="Name"
                                value={editUser.name}
                                onChange={(e: any) =>
                                    setEditUser({
                                        ...editUser,
                                        name: e.target.value,
                                    })
                                }
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <Input
                                        placeholder="Masukkan email"
                                        value={editUser.email}
                                        onChange={(e: any) =>
                                            setEditUser({
                                                ...editUser,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Password */}
                                <div className="flex flex-col relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <Input
                                        placeholder="Kosongkan jika tidak ingin mengubah password"
                                        autoComplete="new-password"
                                        type={showPass ? "text" : "password"}
                                        className="w-full pr-12"
                                        value={editUser.password}
                                        onChange={(e: any) =>
                                            setEditUser({
                                                ...editUser,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                    <div
                                        className="absolute right-3 top-[15px] cursor-pointer text-gray-500 hover:text-gray-700 flex items-center h-full"
                                        onClick={() => setShowPass(!showPass)}
                                    >
                                        {showPass ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Foto Profil
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            profile_photo:
                                                e.target.files?.[0] ||
                                                editUser.profile_photo,
                                        })
                                    }
                                    className="w-full border-2 border-gray-200 rounded-lg p-2"
                                />

                                {typeof editUser.profile_photo === "string" && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        Foto Profil lama:{" "}
                                        {editUser.profile_photo}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Role
                                </label>
                                <select
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                                    value={editUser.role}
                                    onChange={(e) =>
                                        setEditUser({
                                            ...editUser,
                                            role: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Pilih role</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            {/* BUTTON */}
                            <div className="flex gap-4 pt-4">
                                <Button
                                    onClick={handleEditSubmitUser}
                                    className="flex-1 flex items-center justify-center gap-2"
                                >
                                    <Edit className="w-5 h-5" />
                                    <span>Simpan Perubahan</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setShowEditModalUser(false)}
                                >
                                    Batal
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
