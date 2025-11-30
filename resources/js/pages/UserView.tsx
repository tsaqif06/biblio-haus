import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Library,
  Search,
  Star,
  Clock,
  ArrowLeft,
} from "lucide-react";

import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

const dummyBooks = [
  {
    id: 1,
    title: "Matematika Dasar SMA",
    author: "Dr. Ahmad Susanto",
    category: "Matematika",
    cover: "bg-gradient-to-br from-blue-400 to-blue-600",
    rating: 4.8,
    pages: 320,
    description: "Buku panduan lengkap matematika...",
    content: "Bab 1: Pengantar Matematika...",
  },
  {
    id: 2,
    title: "Fisika Kuantum Modern",
    author: "Prof. Budi Santoso",
    category: "Fisika",
    cover: "bg-gradient-to-br from-purple-400 to-purple-600",
    rating: 4.6,
    pages: 450,
    description: "Eksplorasi mendalam mekanika kuantum...",
    content: "Bab 1: Pengantar Fisika Kuantum...",
  },
  {
    id: 3,
    title: "Sejarah Indonesia",
    author: "Dr. Siti Rahayu",
    category: "Sejarah",
    cover: "bg-gradient-to-br from-amber-400 to-amber-600",
    rating: 4.9,
    pages: 280,
    description: "Perjalanan sejarah Indonesia...",
    content: "Bab 1: Indonesia Prasejarah...",
  },
  {
    id: 4,
    title: "Kimia Organik",
    author: "Dr. Dewi Lestari",
    category: "Kimia",
    cover: "bg-gradient-to-br from-green-400 to-green-600",
    rating: 4.7,
    pages: 380,
    description: "Panduan kimia organik...",
    content: "Bab 1: Pengantar Kimia Organik...",
  },
  {
    id: 5,
    title: "Biologi Molekuler",
    author: "Prof. Andi Wijaya",
    category: "Biologi",
    cover: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    rating: 4.8,
    pages: 400,
    description: "Eksplorasi struktur molekul...",
    content: "Bab 1: Dasar Biologi Molekuler...",
  },
  {
    id: 6,
    title: "Ekonomi Makro",
    author: "Dr. Rudi Hartono",
    category: "Ekonomi",
    cover: "bg-gradient-to-br from-orange-400 to-orange-600",
    rating: 4.5,
    pages: 350,
    description: "Analisis ekonomi makro...",
    content: "Bab 1: Pengantar Ekonomi Makro...",
  },
];

export default function UserView() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = dummyBooks.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              hover
              className="overflow-hidden cursor-pointer"
              onClick={() => navigate(`/user/book/${book.id}`)}
            >
              <div
                className={`${book.cover} h-64 flex items-center justify-center`}
              >
                <BookOpen className="w-16 h-16 text-white opacity-50" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {book.category}
                  </span>

                  <div className="flex items-center gap-1 ml-auto">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900">
                      {book.rating}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {book.title}
                </h3>

                <p className="text-gray-600 mb-4">{book.author}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{book.pages} hal</span>
                  </div>

                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/user/book/${book.id}/read`);
                    }}
                  >
                    Baca Sekarang
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
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
