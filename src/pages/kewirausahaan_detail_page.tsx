import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { kewirausahaanData } from "../data/kewirausahaanData";
import type { KewirausahaanItem } from "../data/kewirausahaanData";
import SearchableDropdown from "../components/SearchableDropdown";
import { currentTheme } from "../theme/theme";
import { Heart, X } from "lucide-react";

// Constants for styling based on theme
const ACCENT = currentTheme.primary;
const ACCENT_DARK = currentTheme.heroEnd;
const HERO_BG = currentTheme.heroStart;

// Dummy data for Dosen
const DOSEN_LIST = [
  "Dr. Ir. Wahyu Hidayat, M.Sc.",
  "Prof. Dr. Ir. Budi Santoso, M.T.",
  "Siti Aminah, S.Kom., M.Kom.",
  "Agus Prasetyo, S.T., M.Eng.",
  "Rina Wati, S.E., M.Si.",
  "Dr. H. Ahmad Fauzi, S.T., M.T.",
  "Dra. Lina Herawati, M.Pd.",
  "Ir. Dedi Kurniawan, M.Eng.",
  "Prof. Dr. Maya Sari, S.E., M.Si.",
  "Hendra Gunawan, S.Kom., M.Kom.",
  "Novi Pratiwi, S.Pd., M.Pd.",
  "Dr. Farid Maulana, S.T., Ph.D.",
  "Sri Handayani, S.E., M.M.",
  "Andi Saputra, S.T., M.T.",
  "Dewi Lestari, S.Kom., M.T.",
  "Muhammad Rizki, S.E., M.Ak.",
  "Dr. Nabila Rahma, S.Psi., M.Psi.",
  "Eko Prabowo, S.T., M.Eng.",
  "Fitri Anggraini, S.Kom., M.Kom.",
  "Rudi Hartono, S.E., M.M.",
  "Yuni Astuti, S.Pd., M.Pd.",
  "Dr. Iqbal Syah, S.T., M.T.",
  "Putri Amelia, S.E., M.Si.",
  "Bambang Setiawan, S.Kom., M.T."
];

export default function KewirausahaanDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<KewirausahaanItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDosen, setSelectedDosen] = useState("");

  // Load data based on slug
  useEffect(() => {
    // Simulate a slight delay to show loading state (can be removed for instant load)
    const timer = setTimeout(() => {
      const found = kewirausahaanData.find((item) => item.slug === slug);
      setData(found || null);
      setLoading(false);
    }, 300);

    window.scrollTo(0, 0);

    return () => clearTimeout(timer);
  }, [slug]);

  const handleDaftarClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveModal = () => {
    if (!selectedDosen) return;
    setIsModalOpen(false);
    // Dummy success action
    alert(`Berhasil mendaftar kompetisi "${data?.title}" dengan dosen pembimbing: ${selectedDosen}`);
    setSelectedDosen(""); // reset
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-teal-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <svg className="w-20 h-20 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Kompetisi Tidak Ditemukan</h2>
          <p className="text-gray-500 mb-8 max-w-md">Maaf, halaman detail kewirausahaan yang Anda cari tidak tersedia atau mungkin telah dihapus.</p>
          <button
            onClick={() => navigate("/kewirausahaan")}
            className="px-6 py-3 rounded-xl font-semibold text-white transition-transform active:scale-95"
            style={{ background: ACCENT }}
          >
            Kembali ke Pusat Kompetisi
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Get similar competitions (same category, excluding current one)
  const similarCompetitions = kewirausahaanData
    .filter((item) => item.category === data.category && item.id !== data.id)
    .slice(0, 3);

  // Status Badge Styling
  let statusColor = "";
  let statusBg = "";
  if (data.status === "Buka") {
    statusColor = "#047857"; // Emerald 700
    statusBg = "#D1FAE5"; // Emerald 100
  } else if (data.status === "Tutup") {
    statusColor = "#B91C1C"; // Red 700
    statusBg = "#FEE2E2"; // Red 100
  } else {
    statusColor = "#B45309"; // Amber 700
    statusBg = "#FEF3C7"; // Amber 100
  }

  // Helper to resolve image paths correctly on dynamic routes
  const getImageUrl = (img: string) => {
    if (!img) return "";
    if (img.startsWith("http") || img.startsWith("data:") || img.startsWith("/")) {
      return img;
    }
    return `/${img}`;
  };

  const resolvedImage = getImageUrl(data.image);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Banner Area */}
      <div className="relative pt-10 pb-20 overflow-hidden" style={{ background: HERO_BG }}>
        {/* Blurred background image layer */}
        <div 
          className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay bg-cover bg-center blur-3xl scale-110"
          style={{ backgroundImage: `url('${resolvedImage}')` }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm mb-8 text-white/80">
            <Link to="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <Link to="/kewirausahaan" className="hover:text-white transition-colors">Kewirausahaan</Link>
            <span>/</span>
            <span className="text-white font-medium truncate max-w-[200px] sm:max-w-xs">{data.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
            {/* Title & Badges */}
            <div className="flex-1 lg:pr-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span 
                  className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
                  style={{ background: statusBg, color: statusColor }}
                >
                  {data.status}
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
                  {data.category}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
                {data.title}
              </h1>
              <p className="text-white/80 text-lg flex items-center gap-2">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {data.schedule}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full -mt-12 relative z-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Image & Content) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Main Image */}
            <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100">
              <img 
                src={resolvedImage} 
                alt={data.title} 
                className="w-full h-auto rounded-xl object-contain"
              />
            </div>

            {/* Description Box */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg width="24" height="24" fill="none" stroke={ACCENT} strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tentang Kompetisi
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8 font-medium">
                {data.description}
              </p>

              <h3 className="text-xl font-bold text-gray-800 mb-4">Informasi Selengkapnya</h3>
              <div className="prose prose-lg max-w-none">
                {data.content.map((paragraph, idx) => (
                  <p key={idx} className="text-gray-600 leading-relaxed mb-4 text-[15px] sm:text-base whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="lg:col-span-4 w-full">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:sticky lg:top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-5 border-b border-gray-100 pb-4">
                Ringkasan Detail
              </h3>
              
              <div className="flex flex-col gap-5 mb-8">
                {/* Info Item 1: Tingkatan */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Tingkat</p>
                    <p className="text-sm font-semibold text-gray-800">{data.level}</p>
                  </div>
                </div>

                {/* Info Item 2: Tipe Peserta */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Tim / Individu</p>
                    <p className="text-sm font-semibold text-gray-800">{data.participantType}</p>
                  </div>
                </div>

                {/* Info Item 3: Pelaksanaan */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                      <line x1="8" y1="21" x2="16" y2="21"/>
                      <line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Metode</p>
                    <p className="text-sm font-semibold text-gray-800">{data.method}</p>
                  </div>
                </div>

                {/* Info Item 4: Kuota */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M16 21v-2a4 4 0 00-8 0v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Kuota Pendaftar</p>
                    <p className="text-sm font-semibold text-gray-800">{data.quota}</p>
                  </div>
                </div>

                {/* Info Item 5: Biaya */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-green-50 text-green-600">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="6" width="20" height="12" rx="2"/>
                      <circle cx="12" cy="12" r="2"/>
                      <path d="M6 12h.01M18 12h.01"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Biaya Pendaftaran</p>
                    <p className="text-sm font-bold" style={{ color: data.fee === "Gratis" ? "#047857" : ACCENT_DARK }}>
                      {data.fee}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {/* Action Button */}
                <button
                  onClick={handleDaftarClick}
                  disabled={data.status === "Tutup"}
                  className={`w-full py-3.5 rounded-xl text-[15px] font-bold text-white shadow-lg transition-all active:scale-95 flex justify-center items-center gap-2 ${
                    data.status === "Tutup" ? "bg-gray-400 cursor-not-allowed shadow-none" : "hover:opacity-90"
                  }`}
                  style={{ background: data.status !== "Tutup" ? ACCENT : undefined }}
                >
                  {data.status === "Tutup" ? "Pendaftaran Ditutup" : "Daftar Kompetisi"}
                  {data.status !== "Tutup" && (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`group w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[15px] font-bold border-2 cursor-pointer transition-colors duration-200 active:scale-95 ${
                    isSaved 
                      ? "bg-red-50 border-red-100 text-red-500" 
                      : "bg-white border-gray-200 text-gray-700 hover:border-red-400 hover:text-red-500 hover:bg-red-50"
                  }`}
                >
                  <Heart size={18} className={isSaved ? "fill-red-500 text-red-500" : "text-gray-400 group-hover:text-red-500 transition-colors"} />
                  {isSaved ? "Tersimpan di Wishlist" : "Simpan Kewirausahaan"}
                </button>
              </div>
              
              <p className="text-center text-xs text-gray-400 mt-4">
                Diunggah {data.uploadedAt}
              </p>
            </div>
          </div>
        </div>

        {/* Similar Competitions */}
        {similarCompetitions.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Kompetisi Serupa</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarCompetitions.map((item) => (
                <Link
                  key={item.id}
                  to={`/kewirausahaan/${item.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-teal-500 hover:shadow-lg transition-all group"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={getImageUrl(item.image)} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-teal-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{item.level}</span>
                      <span className="font-semibold text-teal-600">{item.fee}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Daftar Kompetisi - Memilih Dosen Pembimbing */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm transition-all duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Container */}
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-[420px] transform scale-100 transition-all duration-300 flex flex-col animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-3xl relative z-10">
              <h3 className="text-[17px] font-extrabold text-gray-800 tracking-tight">Pilih Dosen Pembimbing</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-red-500 bg-transparent hover:bg-red-50 p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-red-100 active:scale-90"
                aria-label="Tutup"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="px-6 py-6 bg-gray-50/30 flex-1 overflow-visible">
              <p className="text-[14px] text-gray-600 mb-6 leading-relaxed">
                Untuk melanjutkan pendaftaran kompetisi <span className="font-bold text-gray-800">"{data?.title}"</span>, silakan tentukan dosen pembimbing dari tim Anda.
              </p>
              
              <div className="flex flex-col gap-2 relative z-[9999]">
                <label htmlFor="dosen" className="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest">
                  Nama Dosen <span className="text-red-500">*</span>
                </label>
                <div className="w-full">
                  <SearchableDropdown
                    value={selectedDosen}
                    onChange={setSelectedDosen}
                    options={DOSEN_LIST}
                    placeholder="-- Klik untuk memilih dosen --"
                  />
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="px-6 py-5 border-t border-gray-100 flex justify-end gap-3 bg-white mt-auto rounded-b-3xl relative z-10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-[14px] font-extrabold text-gray-600 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-300 transition-all active:scale-95 focus:outline-none"
              >
                Close
              </button>
              <button
                onClick={handleSaveModal}
                disabled={!selectedDosen}
                className={`px-5 py-2.5 rounded-xl text-[14px] font-extrabold text-white transition-all duration-200 flex items-center justify-center border-2 border-transparent ${
                  !selectedDosen 
                    ? "opacity-50 cursor-not-allowed bg-gray-400" 
                    : "hover:opacity-90 shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-opacity-50"
                }`}
                style={{ 
                  background: selectedDosen ? ACCENT : undefined,
                  ['--tw-ring-color' as string]: selectedDosen ? ACCENT : undefined
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
