import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    User,
    BookOpen,
    Library,
    ChevronDown,
    Search,
    Clock,
} from "lucide-react";

import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

import { logout as apiLogout } from "../api/auth.ts";
import { getBooksUser } from "../api/books.ts";
import { getProfile } from "../api/auth.ts";

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

    last_opened_at?: string;
}

export default function UserView() {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ name?: string }>({});
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [profileOpen, setProfileOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchBooks();
        fetchUser();
    }, []);

    const fetchBooks = async () => {
        try {
            setIsLoading(true);
            const data = await getBooksUser();
            setBooks(data);
        } catch (error) {
            console.error("Gagal mengambil data buku:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUser = async () => {
        try {
            const data = await getProfile();
            setUser(data);
        } catch (error) {
            console.error("Gagal mengambil profile user:", error);
        }
    };

    const filteredBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (book.category || "")
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
    );

    const handleLogout = async () => {
        try {
            await apiLogout();
        } catch (error) {
            console.error("Logout gagal di server:", error);
        }

        localStorage.removeItem("auth_token");
        navigate("/");
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBooks = filteredBooks.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-600 p-2 rounded-lg">
                            <Library className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                            BiblioHaus
                        </span>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
                        >
                            <User className="w-5 h-5 text-gray-700" />
                            <span className="text-sm font-medium text-gray-800">
                                {user?.name ?? "User"}
                            </span>
                            <ChevronDown className="w-4 h-4" />
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg py-2 z-50">
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

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Koleksi Buku Digital
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Jelajahi ribuan buku dari berbagai kategori
                    </p>

                    <div className="max-w-2xl relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            placeholder="Cari buku berdasarkan judul, penulis, atau kategori..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12"
                        />
                    </div>
                </div>

                {isLoading && (
                    <div className="text-center py-20 text-gray-600">
                        Memuat buku...
                    </div>
                )}
                {!isLoading && (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedBooks.map((book) => (
                                <Card
                                    key={book.id}
                                    hover
                                    className="overflow-hidden cursor-pointer"
                                    onClick={() =>
                                        navigate(`/user/book/${book.id}`)
                                    }
                                >
                                    {/* COVER */}
                                    <div className="h-64 w-full bg-gray-200 overflow-hidden flex justify-center items-center">
                                        {book.cover ? (
                                            <img
                                                src={`/storage/${book.cover}`}
                                                alt={book.title}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <BookOpen className="w-16 h-16 text-white opacity-50" />
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                {book.category}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                            {book.title}
                                        </h3>

                                        <p className="text-gray-600 mb-4">
                                            {book.author}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                <Clock className="w-4 h-4" />
                                                <span>
                                                    {book.last_opened_at
                                                        ? `Terakhir dibuka: ${new Date(
                                                              book.last_opened_at
                                                          ).toLocaleString()}`
                                                        : "Belum Dibaca"}
                                                </span>
                                            </div>

                                            <Button
                                                size="sm"
                                                onClick={async (e) => {
                                                    e.stopPropagation();

                                                    if (!user?.id) return;

                                                    try {
                                                        await fetch(
                                                            "/api/reading-history/open",
                                                            {
                                                                method: "POST",
                                                                headers: {
                                                                    "Content-Type":
                                                                        "application/json",
                                                                    Authorization: `Bearer ${localStorage.getItem(
                                                                        "auth_token"
                                                                    )}`,
                                                                },
                                                                body: JSON.stringify(
                                                                    {
                                                                        book_id:
                                                                            book.id,
                                                                    }
                                                                ),
                                                            }
                                                        );
                                                    } catch (err) {
                                                        console.error(
                                                            "Gagal update reading history:",
                                                            err
                                                        );
                                                    }

                                                    window.open(
                                                        `/read/${book.title
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "-"
                                                            )}`,
                                                        "_blank"
                                                    );

                                                    setBooks((prev) =>
                                                        [...prev]
                                                            .map((b) =>
                                                                b.id === book.id
                                                                    ? {
                                                                          ...b,
                                                                          last_opened_at:
                                                                              new Date().toISOString(),
                                                                      }
                                                                    : b
                                                            )
                                                            .sort((a, b) => {
                                                                if (
                                                                    !a.last_opened_at &&
                                                                    !b.last_opened_at
                                                                )
                                                                    return 0;
                                                                if (
                                                                    !a.last_opened_at
                                                                )
                                                                    return 1;
                                                                if (
                                                                    !b.last_opened_at
                                                                )
                                                                    return -1;
                                                                return (
                                                                    new Date(
                                                                        b.last_opened_at
                                                                    ).getTime() -
                                                                    new Date(
                                                                        a.last_opened_at
                                                                    ).getTime()
                                                                );
                                                            })
                                                    );
                                                }}
                                            >
                                                Baca Sekarang
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
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
                    </>
                )}

                {!isLoading && filteredBooks.length === 0 && (
                    <div className="text-center py-20">
                        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Buku tidak ditemukan
                        </h3>
                        <p className="text-gray-600">
                            Coba kata kunci pencarian yang berbeda
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
