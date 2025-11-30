import { useState } from 'react';
import { BookOpen, Library, Search, Star, Clock, ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';

interface UserViewProps {
  onBack: () => void;
}

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  cover: string;
  rating: number;
  pages: number;
  description: string;
  content: string;
}

const dummyBooks: Book[] = [
  {
    id: 1,
    title: "Matematika Dasar SMA",
    author: "Dr. Ahmad Susanto",
    category: "Matematika",
    cover: "bg-gradient-to-br from-blue-400 to-blue-600",
    rating: 4.8,
    pages: 320,
    description: "Buku panduan lengkap matematika untuk siswa SMA kelas 10-12. Mencakup aljabar, geometri, trigonometri, dan kalkulus dasar.",
    content: "Bab 1: Pengantar Matematika\n\nMatematika adalah ilmu yang mempelajari besaran, struktur, ruang, dan perubahan. Dalam buku ini, kita akan menjelajahi berbagai konsep matematika yang fundamental untuk pendidikan menengah atas.\n\n1.1 Sistem Bilangan\nSistem bilangan adalah dasar dari semua operasi matematika. Kita akan mempelajari bilangan bulat, pecahan, desimal, dan bilangan real.\n\n1.2 Aljabar Dasar\nAljabar adalah cabang matematika yang menggunakan simbol untuk merepresentasikan angka dan operasi. Ini memungkinkan kita untuk menyelesaikan masalah yang kompleks dengan cara yang sistematis."
  },
  {
    id: 2,
    title: "Fisika Kuantum Modern",
    author: "Prof. Budi Santoso",
    category: "Fisika",
    cover: "bg-gradient-to-br from-purple-400 to-purple-600",
    rating: 4.6,
    pages: 450,
    description: "Eksplorasi mendalam tentang mekanika kuantum dan aplikasinya dalam teknologi modern.",
    content: "Bab 1: Pengantar Fisika Kuantum\n\nFisika kuantum adalah teori fundamental dalam fisika yang memberikan deskripsi tentang sifat-sifat fisik alam pada skala atom dan subatomik.\n\nPrinsip ketidakpastian Heisenberg menyatakan bahwa kita tidak dapat mengetahui secara bersamaan posisi dan momentum partikel dengan presisi sempurna."
  },
  {
    id: 3,
    title: "Sejarah Indonesia",
    author: "Dr. Siti Rahayu",
    category: "Sejarah",
    cover: "bg-gradient-to-br from-amber-400 to-amber-600",
    rating: 4.9,
    pages: 280,
    description: "Perjalanan komprehensif melalui sejarah Indonesia dari masa prasejarah hingga modern.",
    content: "Bab 1: Indonesia Prasejarah\n\nIndonesia memiliki sejarah panjang yang dimulai sejak zaman prasejarah. Penemuan fosil Homo erectus di Sangiran, Jawa Tengah menunjukkan bahwa manusia telah mendiami kepulauan ini sejak jutaan tahun yang lalu."
  },
  {
    id: 4,
    title: "Kimia Organik",
    author: "Dr. Dewi Lestari",
    category: "Kimia",
    cover: "bg-gradient-to-br from-green-400 to-green-600",
    rating: 4.7,
    pages: 380,
    description: "Panduan lengkap kimia organik dengan fokus pada struktur molekul dan reaksi kimia.",
    content: "Bab 1: Pengantar Kimia Organik\n\nKimia organik adalah cabang kimia yang mempelajari struktur, sifat, komposisi, reaksi, dan sintesis senyawa organik yang mengandung karbon."
  },
  {
    id: 5,
    title: "Biologi Molekuler",
    author: "Prof. Andi Wijaya",
    category: "Biologi",
    cover: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    rating: 4.8,
    pages: 400,
    description: "Eksplorasi mendalam tentang struktur dan fungsi molekul dalam sistem biologis.",
    content: "Bab 1: Dasar-Dasar Biologi Molekuler\n\nBiologi molekuler adalah studi tentang biologi pada tingkat molekuler, termasuk interaksi antara berbagai sistem sel."
  },
  {
    id: 6,
    title: "Ekonomi Makro",
    author: "Dr. Rudi Hartono",
    category: "Ekonomi",
    cover: "bg-gradient-to-br from-orange-400 to-orange-600",
    rating: 4.5,
    pages: 350,
    description: "Analisis komprehensif tentang ekonomi makro dan kebijakan fiskal.",
    content: "Bab 1: Pengantar Ekonomi Makro\n\nEkonomi makro mempelajari perilaku dan kinerja ekonomi secara keseluruhan, termasuk inflasi, pengangguran, dan pertumbuhan ekonomi."
  }
];

export default function UserView({ onBack }: UserViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBooks = dummyBooks.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReadBook = (book: Book) => {
    setSelectedBook(book);
    setIsReading(true);
    setCurrentPage(1);
  };

  const handleCloseReader = () => {
    setIsReading(false);
    setSelectedBook(null);
    setCurrentPage(1);
  };

  if (isReading && selectedBook) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={handleCloseReader}>
                <X className="w-4 h-4 mr-2" />
                Tutup
              </Button>
              <div>
                <h3 className="font-bold text-gray-900">{selectedBook.title}</h3>
                <p className="text-sm text-gray-600">{selectedBook.author}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Halaman {currentPage} dari {selectedBook.pages}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <Card className="p-12">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                {selectedBook.content}
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Sebelumnya
            </Button>
            <span className="text-gray-600">
              {currentPage} / {selectedBook.pages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(selectedBook.pages, currentPage + 1))}
              disabled={currentPage === selectedBook.pages}
            >
              Selanjutnya
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedBook && !isReading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Library className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">DigiLib</span>
            </div>
            <Button variant="outline" onClick={() => setSelectedBook(null)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Koleksi
            </Button>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <div className={`${selectedBook.cover} aspect-[2/3] rounded-lg shadow-lg mb-6 flex items-center justify-center`}>
                  <BookOpen className="w-20 h-20 text-white opacity-50" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-gray-900">{selectedBook.rating}</span>
                  <span className="text-gray-600 text-sm">(125 ulasan)</span>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{selectedBook.pages} halaman</span>
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm inline-block">
                    {selectedBook.category}
                  </div>
                </div>
                <Button className="w-full mb-3" onClick={() => handleReadBook(selectedBook)}>
                  <BookOpen className="w-5 h-5 mr-2" />
                  Mulai Membaca
                </Button>
                <Button variant="outline" className="w-full">
                  Tambah ke Favorit
                </Button>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedBook.title}</h1>
                <p className="text-xl text-gray-600 mb-6">oleh {selectedBook.author}</p>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Buku</h2>
                  <p className="text-gray-700 leading-relaxed">{selectedBook.description}</p>
                </div>

                <div className="border-t pt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Buku Terkait</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {dummyBooks
                      .filter(b => b.category === selectedBook.category && b.id !== selectedBook.id)
                      .slice(0, 2)
                      .map(book => (
                        <Card key={book.id} hover className="p-4 cursor-pointer" onClick={() => setSelectedBook(book)}>
                          <div className="flex gap-4">
                            <div className={`${book.cover} w-20 h-28 rounded-lg flex-shrink-0 flex items-center justify-center`}>
                              <BookOpen className="w-8 h-8 text-white opacity-50" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">{book.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm text-gray-700">{book.rating}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Library className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">DigiLib</span>
          </div>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Koleksi Buku Digital</h1>
          <p className="text-xl text-gray-600 mb-8">Jelajahi ribuan buku dari berbagai kategori</p>

          <div className="max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Cari buku berdasarkan judul, penulis, atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <Card key={book.id} hover className="overflow-hidden cursor-pointer" onClick={() => setSelectedBook(book)}>
              <div className={`${book.cover} h-64 flex items-center justify-center`}>
                <BookOpen className="w-16 h-16 text-white opacity-50" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {book.category}
                  </span>
                  <div className="flex items-center gap-1 ml-auto">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900">{book.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{book.title}</h3>
                <p className="text-gray-600 mb-4">{book.author}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{book.pages} hal</span>
                  </div>
                  <Button size="sm" onClick={(e) => {
                    e.stopPropagation();
                    handleReadBook(book);
                  }}>
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Buku tidak ditemukan</h3>
            <p className="text-gray-600">Coba kata kunci pencarian yang berbeda</p>
          </div>
        )}
      </div>
    </div>
  );
}
