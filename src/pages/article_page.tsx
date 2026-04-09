import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { articleData } from "../data/articles";
import { pastelGreen } from "../theme/pastel_green";
import { GREEN_DARK } from "../data/constants";

const GREEN = pastelGreen.primary;
const GREEN_LIGHT = pastelGreen.surfaceAlt;

export default function ArticlePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Artikel");
  const [sortBy, setSortBy] = useState("Terbaru");
  const [searchArtikel, setSearchArtikel] = useState("");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Handle tab change with navigation
  const handleTabChange = (tab: string) => {
    if (tab === "Acara") {
      navigate("/karir/acara");
    } else {
      setActiveTab(tab);
    }
  };

  // Filter data
  const filtered = articleData.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(searchArtikel.toLowerCase());
    return matchSearch;
  });

  // Sort data
  const sorted = [...filtered].sort((a, b) =>
    sortBy === "Terbaru" ? b.id - a.id : a.id - b.id
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── HERO SEARCH SECTION ── */}
      <div
        className="px-6 py-12 md:py-16 pt-24"
        style={{ background: GREEN_DARK }}
      >
        <div className="max-w-7xl mx-auto p-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-white opacity-75 mb-3">
            Kumpulan Informasi
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            Temukan Artikel & Berita
          </h1>
          <p className="text-sm text-white opacity-70 mb-8 max-w-lg leading-relaxed">
            Dapatkan informasi terbaru seputar karir, inspirasi, pendidikan, dan berbagai berita lainnya yang telah kami susun untuk Anda.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-3 relative z-10">
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 h-12 flex-1 shadow-sm">
              <svg className="text-gray-400 shrink-0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-400"
                placeholder="Cari artikel anda"
                value={searchArtikel}
                onChange={(e) => setSearchArtikel(e.target.value)}
              />
            </div>

            <button
              className="h-12 px-7 rounded-xl text-sm font-semibold shadow-md transition-all duration-150 active:scale-95 cursor-pointer"
              style={{ background: "white", color: GREEN }}
              onMouseEnter={(e) => { e.currentTarget.style.background = GREEN_LIGHT; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "white"; }}
            >
              Cari Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* ── BODY SECTION ── */}
      <div className="max-w-7xl mx-auto p-6">

        {/* Tabs Artikel/Acara */}
        <div className="flex border-b border-gray-200 mb-6">
          {["Artikel", "Acara"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className="relative px-5 py-3 text-sm font-medium transition-colors duration-150 cursor-pointer"
              style={{ color: activeTab === tab ? GREEN : "#9CA3AF" }}
            >
              {tab}
              {activeTab === tab && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t"
                  style={{ background: GREEN }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Sort row */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            Menampilkan{" "}
            <span className="font-semibold text-gray-800">{sorted.length}</span>{" "}
            {activeTab.toLowerCase()}
          </p>

          <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
            {["Terbaru", "Terpopuler"].map((opt) => (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                className="text-xs font-semibold px-4 py-1.5 rounded-md transition-all duration-150 cursor-pointer"
                style={
                  sortBy === opt
                    ? { background: "white", color: GREEN, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }
                    : { background: "transparent", color: "#9CA3AF" }
                }
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.length === 0 ? (
            <div className="col-span-3 flex flex-col items-center justify-center py-20 text-gray-400">
              <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <p className="mt-3 text-sm">Tidak ada {activeTab.toLowerCase()} ditemukan.</p>
            </div>
          ) : (
            sorted.map((item) => {
              const isHovered = hoveredCard === item.id;
              return (
                <Link
                  key={item.id}
                  to={`/artikel/${item.slug}`}
                  className="bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-200 cursor-pointer"
                  style={{
                    border: isHovered ? `1.5px solid ${GREEN}` : "1.5px solid #F0F0F0",
                    boxShadow: isHovered
                      ? "0 12px 32px rgba(43,92,56,0.14)"
                      : "0 2px 8px rgba(0,0,0,0.04)",
                    transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                  }}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Image */}
                  <div className="w-full h-40 bg-gray-200 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300"
                      style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    {/* Date */}
                    <div className="flex items-center gap-2">
                      <svg className="text-gray-400" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span className="text-xs text-gray-500">{item.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-gray-800 leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">
                      {item.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-end pt-3 border-t border-gray-100">
                      <span
                        className="text-xs font-semibold transition-colors duration-150 flex items-center gap-1 cursor-pointer"
                        style={{ color: isHovered ? GREEN : "#9CA3AF" }}
                      >
                        Baca Selengkapnya
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
