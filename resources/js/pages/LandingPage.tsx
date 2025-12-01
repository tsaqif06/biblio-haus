import {
    BookOpen,
    Library,
    Users,
    Search,
    Sparkles,
    Download,
} from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-600 p-2 rounded-lg">
                            <Library className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                BiblioHaus
                            </h1>
                            <p className="text-xs text-green-600">
                                Perpustakaan Digital Sekolah
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            className={`cursor-pointer`}
                            variant="outline"
                            onClick={() => navigate("/login")}
                        >
                            Masuk Sebagai User
                        </Button>
                        <Button 
                            className={`cursor-pointer`}
                            onClick={() => navigate("/login/admin")}>
                            Masuk Sebagai Admin
                        </Button>
                    </div>
                </div>
            </nav>

            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            🎓 Platform Pembelajaran Modern
                        </div>
                        <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Jelajahi Dunia Pengetahuan Digital
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Akses ribuan buku digital, baca langsung di browser,
                            dan tingkatkan literasi dengan teknologi modern.
                            Semua dalam satu platform yang mudah digunakan.
                        </p>

                        <div className="flex gap-4">
                            <Button
                                size="lg"
                                onClick={() => navigate("/login")}
                            >
                                <BookOpen className="w-5 h-5 mr-2" />
                                Mulai Membaca
                            </Button>

                            <Button variant="outline" size="lg">
                                <Download className="w-5 h-5 mr-2" />
                                Download App
                            </Button>
                        </div>

                        <div className="mt-8 flex items-center gap-8">
                            <div>
                                <p className="text-3xl font-bold text-green-600">
                                    5,000+
                                </p>
                                <p className="text-gray-600">Koleksi Buku</p>
                            </div>

                            <div>
                                <p className="text-3xl font-bold text-green-600">
                                    2,500+
                                </p>
                                <p className="text-gray-600">Siswa Aktif</p>
                            </div>

                            <div>
                                <p className="text-3xl font-bold text-green-600">
                                    100%
                                </p>
                                <p className="text-gray-600">Gratis</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                            <div className="bg-white rounded-2xl p-6 transform -rotate-3">
                                <div className="aspect-[3/4] bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-32 h-32 text-green-600" />
                                </div>
                                <div className="mt-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h3 className="text-4xl font-bold text-gray-900 mb-4">
                        Fitur Unggulan
                    </h3>
                    <p className="text-xl text-gray-600">
                        Pengalaman membaca digital yang sempurna
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <Card hover className="p-8">
                        <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                            <Search className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-3">
                            Pencarian Cerdas
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                            Temukan buku yang Anda cari dengan mudah menggunakan
                            sistem pencarian canggih berdasarkan judul, penulis,
                            atau kategori.
                        </p>
                    </Card>

                    <Card hover className="p-8">
                        <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                            <BookOpen className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-3">
                            Baca Online
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                            Nikmati pengalaman membaca yang nyaman langsung di
                            browser tanpa perlu download. Tersedia mode gelap
                            untuk kenyamanan mata.
                        </p>
                    </Card>

                    <Card hover className="p-8">
                        <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                            <Users className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-3">
                            Komunitas Aktif
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                            Bergabung dengan ribuan siswa lainnya. Lihat
                            rekomendasi buku populer dan bagikan ulasan dengan
                            teman-teman.
                        </p>
                    </Card>
                </div>
            </section>

            <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Sparkles className="w-6 h-6" />
                                <span className="font-semibold">
                                    Untuk Guru & Admin
                                </span>
                            </div>

                            <h3 className="text-4xl font-bold mb-6">
                                Kelola Perpustakaan dengan Mudah
                            </h3>

                            <p className="text-xl text-green-50 mb-8 leading-relaxed">
                                Dashboard admin yang powerful untuk mengelola
                                koleksi buku, memantau aktivitas peminjaman, dan
                                menganalisis statistik penggunaan perpustakaan.
                            </p>

                            <Button
                                variant="secondary"
                                size="lg"
                                className={`cursor-pointer`}
                                onClick={() => navigate("/admin/login")}
                            >
                                Akses Dashboard Admin
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Card className="p-6 bg-white/10 backdrop-blur-lg text-white border border-white/20">
                                <Library className="w-10 h-10 mb-4 opacity-80" />
                                <p className="text-3xl font-bold mb-2">
                                    5,000+
                                </p>
                                <p className="text-green-100">Total Buku</p>
                            </Card>

                            <Card className="p-6 bg-white/10 backdrop-blur-lg text-white border border-white/20">
                                <Users className="w-10 h-10 mb-4 opacity-80" />
                                <p className="text-3xl font-bold mb-2">
                                    2,500+
                                </p>
                                <p className="text-green-100">Pengguna Aktif</p>
                            </Card>

                            <Card className="p-6 bg-white/10 backdrop-blur-lg text-white border border-white/20">
                                <BookOpen className="w-10 h-10 mb-4 opacity-80" />
                                <p className="text-3xl font-bold mb-2">
                                    15,000+
                                </p>
                                <p className="text-green-100">Buku Dibaca</p>
                            </Card>

                            <Card className="p-6 bg-white/10 backdrop-blur-lg text-white border border-white/20">
                                <Sparkles className="w-10 h-10 mb-4 opacity-80" />
                                <p className="text-3xl font-bold mb-2">4.9/5</p>
                                <p className="text-green-100">
                                    Rating Pengguna
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Library className="w-8 h-8 text-green-500" />
                                <span className="text-xl font-bold">
                                    BiblioHaus
                                </span>
                            </div>
                            <p className="text-gray-400">
                                Platform perpustakaan digital modern untuk
                                meningkatkan literasi di lingkungan sekolah.
                            </p>
                        </div>

                        <div>
                            <h5 className="font-semibold mb-4">Navigasi</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-green-500 transition-colors"
                                    >
                                        Beranda
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-green-500 transition-colors"
                                    >
                                        Koleksi Buku
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-green-500 transition-colors"
                                    >
                                        Tentang Kami
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold mb-4">Bantuan</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-green-500 transition-colors"
                                    >
                                        FAQ
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-green-500 transition-colors"
                                    >
                                        Panduan
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-green-500 transition-colors"
                                    >
                                        Kontak
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold mb-4">Kontak</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li>Email: info@bibliohaus.sch.id</li>
                                <li>Telp: (021) 1234-5678</li>
                                <li>Alamat: Jl. Pendidikan No. 123</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>
                            &copy; 2025 Bibliohaus - Perpustakaan Digital
                            Sekolah. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
