import { useState } from 'react';
import { Library, ArrowLeft, Plus, Search, Edit, Trash2, BookOpen, Users, TrendingUp, Eye } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';

interface AdminViewProps {
  onBack: () => void;
}

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  pages: number;
  borrowed: number;
  available: number;
}

const dummyAdminBooks: Book[] = [
  { id: 1, title: "Matematika Dasar SMA", author: "Dr. Ahmad Susanto", category: "Matematika", pages: 320, borrowed: 45, available: 15 },
  { id: 2, title: "Fisika Kuantum Modern", author: "Prof. Budi Santoso", category: "Fisika", pages: 450, borrowed: 32, available: 8 },
  { id: 3, title: "Sejarah Indonesia", author: "Dr. Siti Rahayu", category: "Sejarah", pages: 280, borrowed: 67, available: 23 },
  { id: 4, title: "Kimia Organik", author: "Dr. Dewi Lestari", category: "Kimia", pages: 380, borrowed: 28, available: 12 },
  { id: 5, title: "Biologi Molekuler", author: "Prof. Andi Wijaya", category: "Biologi", pages: 400, borrowed: 51, available: 19 },
  { id: 6, title: "Ekonomi Makro", author: "Dr. Rudi Hartono", category: "Ekonomi", pages: 350, borrowed: 39, available: 11 }
];

export default function AdminView({ onBack }: AdminViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [books, setBooks] = useState(dummyAdminBooks);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalBooks = books.reduce((sum, book) => sum + book.available + book.borrowed, 0);
  const totalBorrowed = books.reduce((sum, book) => sum + book.borrowed, 0);
  const totalAvailable = books.reduce((sum, book) => sum + book.available, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Library className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard Admin</h1>
              <p className="text-xs text-gray-600">Kelola perpustakaan digital</p>
            </div>
          </div>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{totalBooks}</p>
            <p className="text-gray-600">Total Buku</p>
            <div className="mt-2 flex items-center gap-1 text-green-600 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+12% bulan ini</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">2,547</p>
            <p className="text-gray-600">Pengguna Aktif</p>
            <div className="mt-2 flex items-center gap-1 text-blue-600 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+8% bulan ini</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Eye className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{totalBorrowed}</p>
            <p className="text-gray-600">Sedang Dipinjam</p>
            <div className="mt-2 flex items-center gap-1 text-orange-600 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+15% bulan ini</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Library className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{totalAvailable}</p>
            <p className="text-gray-600">Buku Tersedia</p>
            <div className="mt-2 flex items-center gap-1 text-purple-600 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Stabil</span>
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Kelola Koleksi Buku</h2>
              <p className="text-gray-600">Tambah, edit, atau hapus buku dari perpustakaan</p>
            </div>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Tambah Buku Baru
            </Button>
          </div>

          <div className="mb-6 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Cari buku..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Judul Buku</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Penulis</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Kategori</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Halaman</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Dipinjam</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Tersedia</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map(book => (
                  <tr key={book.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-semibold text-gray-900">{book.title}</p>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{book.author}</td>
                    <td className="py-4 px-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {book.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-600">{book.pages}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-orange-600">{book.borrowed}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-green-600">{book.available}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Tidak ada buku yang ditemukan</p>
            </div>
          )}
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Buku Paling Populer</h3>
            <div className="space-y-4">
              {books
                .sort((a, b) => b.borrowed - a.borrowed)
                .slice(0, 5)
                .map((book, index) => (
                  <div key={book.id} className="flex items-center gap-4">
                    <div className="bg-green-100 text-green-700 font-bold w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{book.title}</p>
                      <p className="text-sm text-gray-600">{book.author}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{book.borrowed}</p>
                      <p className="text-xs text-gray-600">dipinjam</p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Kategori Populer</h3>
            <div className="space-y-4">
              {Array.from(new Set(books.map(b => b.category))).map((category, index) => {
                const categoryBooks = books.filter(b => b.category === category);
                const totalBorrowed = categoryBooks.reduce((sum, b) => sum + b.borrowed, 0);
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-indigo-500'];
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{category}</span>
                      <span className="text-sm text-gray-600">{totalBorrowed} peminjaman</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${colors[index % colors.length]} h-3 rounded-full transition-all duration-300`}
                        style={{ width: `${(totalBorrowed / totalBorrowed) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <Card className="max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Tambah Buku Baru</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <Input label="Judul Buku" placeholder="Masukkan judul buku" />
              <Input label="Penulis" placeholder="Masukkan nama penulis" />
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Kategori" placeholder="Contoh: Matematika" />
                <Input label="Jumlah Halaman" type="number" placeholder="320" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Jumlah Buku" type="number" placeholder="10" />
                <Input label="ISBN" placeholder="978-xxx-xxx-xxx-x" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  rows={4}
                  placeholder="Masukkan deskripsi buku..."
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <Button className="flex-1" onClick={() => setShowAddModal(false)}>
                  <Plus className="w-5 h-5 mr-2" />
                  Tambah Buku
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>
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
