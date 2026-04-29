import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { 
  kewirausahaanData, 
  KEWIRAUSAHAAN_CATEGORIES,
  KEWIRAUSAHAAN_LEVELS,
  KEWIRAUSAHAAN_PARTICIPANTS
} from "../data/kewirausahaanData";
import { currentTheme } from "../theme/theme";

// ── Theme constants ──────────────────────────────────────────────────────────
const ACCENT      = currentTheme.primary;
const ACCENT_DARK = currentTheme.heroEnd;
const ACCENT_LIGHT = currentTheme.surfaceAlt;
const HERO_BG     = currentTheme.heroStart;
const SURFACE     = currentTheme.surface;
const BORDER      = currentTheme.border;

// ── Sidebar Category Pill ──────────────────────────────────────────────────
interface CategoryPillProps {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}

function CategoryPill({ label, count, active, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left"
      style={{
        background: active ? ACCENT : "transparent",
        color: active ? "white" : "#374151",
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = SURFACE; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
    >
      <span className="flex-1">{label}</span>
      {count !== undefined && (
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full ml-2"
          style={{
            background: active ? "rgba(255,255,255,0.25)" : ACCENT_LIGHT,
            color: active ? "white" : ACCENT_DARK,
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

// ── Competition Card ─────────────────────────────────────────────────────────
interface CompetitionCardProps {
  item: typeof kewirausahaanData[0];
}

function CompetitionCard({ item }: CompetitionCardProps) {
  const [hovered, setHovered] = useState(false);

  // Status Badge Color
  let statusColor = "";
  let statusBg = "";
  if (item.status === "Buka") {
    statusColor = "#047857"; // Emerald 700
    statusBg = "#D1FAE5";    // Emerald 100
  } else if (item.status === "Tutup") {
    statusColor = "#B91C1C"; // Red 700
    statusBg = "#FEE2E2";    // Red 100
  } else {
    statusColor = "#B45309"; // Amber 700
    statusBg = "#FEF3C7";    // Amber 100
  }

  return (
    <Link
      to={`/kewirausahaan/${item.slug}`}
      className="bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-200"
      style={{
        border: hovered ? `1.5px solid ${ACCENT}` : "1.5px solid #F0F0F0",
        boxShadow: hovered ? "0 12px 32px rgba(47,143,143,0.14)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image / Poster */}
      <div className="w-full relative overflow-hidden bg-gray-900 flex items-center justify-center group" style={{ aspectRatio: "4/5", maxHeight: "400px" }}>
        {/* Background layer (Blurred & Darkened) to fill empty space */}
        <img 
          src={item.image} 
          alt="blur-bg" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 blur-xl scale-110"
          style={{ transform: hovered ? "scale(1.15)" : "scale(1.1)" }}
        />
        
        {/* Foreground Image (Original Aspect Ratio) */}
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain transition-transform duration-350 ease-out relative z-10 drop-shadow-xl"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
        />
        
        {/* Top Badges overlay */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20">
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm"
            style={{ background: statusBg, color: statusColor }}
          >
            {item.status}
          </span>
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm"
            style={{ background: "rgba(0,0,0,0.6)", color: "white", backdropFilter: "blur(4px)" }}
          >
            {item.uploadedAt}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Meta Line 1: Type & Level */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-xs font-semibold px-2 py-1 rounded-md"
            style={{ background: ACCENT_LIGHT, color: ACCENT_DARK }}
          >
            {item.category}
          </span>
          <span className="text-xs font-medium text-gray-500 border border-gray-200 px-2 py-1 rounded-md">
            {item.method}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[17px] font-bold text-gray-800 leading-snug line-clamp-2" title={item.title}>
          {item.title}
        </h3>

        {/* Info Grid (Schedule, Quota, Participant) */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-2 my-1">
          <div className="flex items-start gap-1.5 text-gray-500">
            <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="text-[11px] leading-tight">{item.schedule}</span>
          </div>
          <div className="flex items-start gap-1.5 text-gray-500">
            <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="text-[11px] leading-tight">{item.quota}</span>
          </div>
          <div className="flex items-start gap-1.5 text-gray-500 col-span-2">
             <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
               <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
             </svg>
             <span className="text-[11px] leading-tight">Tk. {item.level} ({item.participantType})</span>
          </div>
        </div>

        {/* Description */}
        <p 
          className="text-[13px] text-gray-500 overflow-hidden"
          style={{ 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            lineHeight: '1.5em', 
            maxHeight: '3em' 
          }}
        >
          {item.description}
        </p>

        {/* Footer: Fee & Action */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Biaya</span>
            <span className="text-sm font-bold" style={{ color: item.fee === "Gratis" ? "#047857" : ACCENT_DARK }}>
              {item.fee}
            </span>
          </div>
          <span
            className="text-xs font-semibold flex items-center gap-1 transition-colors duration-150"
            style={{ color: hovered ? ACCENT : "#9CA3AF" }}
          >
            Lihat Detail
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function KewirausahaanPage() {
  // Top Filters
  const TOP_TABS = ["Semua", "Terpopuler", "Berbayar", "Gratis"];
  const [activeTopTab, setActiveTopTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // Sidebar Filters
  const [activeCategory, setActiveCategory] = useState("Semua Kategori");
  const [activeLevel, setActiveLevel] = useState("Semua Kategori");
  const [activeParticipant, setActiveParticipant] = useState("Semua Kategori");

  // Filtering Logic
  const filtered = kewirausahaanData.filter((item) => {
    // 1. Search Query
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Top Tabs
    let matchTopTab = true;
    if (activeTopTab === "Berbayar") matchTopTab = item.fee !== "Gratis";
    if (activeTopTab === "Gratis") matchTopTab = item.fee === "Gratis";
    // "Terpopuler" is handled by sorting below, but we can also filter if we want (e.g. only featured). 
    // We'll leave it as `true` and handle via sort.

    // 3. Sidebar Filters
    const matchCategory = activeCategory === "Semua Kategori" || item.category === activeCategory;
    const matchLevel = activeLevel === "Semua Kategori" || item.level === activeLevel;
    const matchParticipant = activeParticipant === "Semua Kategori" || item.participantType === activeParticipant;

    return matchSearch && matchTopTab && matchCategory && matchLevel && matchParticipant;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (activeTopTab === "Terpopuler") {
      // Dummy popularity sort (featured first, then higher ID)
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.id - a.id;
    }
    // Default sort by ID desc
    return b.id - a.id;
  });

  // Category counts (only for main categories)
  const categoryCounts = KEWIRAUSAHAAN_CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = cat === "Semua Kategori"
      ? kewirausahaanData.length
      : kewirausahaanData.filter((d) => d.category === cat).length;
    return acc;
  }, {});

  const hasActiveFilters = activeCategory !== "Semua Kategori" || 
                           activeLevel !== "Semua Kategori" || 
                           activeParticipant !== "Semua Kategori" || 
                           searchQuery !== "" ||
                           activeTopTab !== "Semua";

  const clearFilters = () => {
    setActiveCategory("Semua Kategori");
    setActiveLevel("Semua Kategori");
    setActiveParticipant("Semua Kategori");
    setSearchQuery("");
    setActiveTopTab("Semua");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 py-12 sm:py-14" style={{ background: HERO_BG }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-white opacity-75 mb-3">
            Pusat Kompetisi
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white mb-2 leading-tight tracking-tight">
            Perlombaan &amp; Kompetisi
          </h1>
          <p className="text-sm sm:text-base text-white opacity-85 mb-7 max-w-2xl leading-relaxed">
            Temukan berbagai ajang perlombaan, hackathon, dan kompetisi bisnis untuk mengembangkan potensi, menambah portofolio, dan memenangkan hadiah menarik.
          </p>

          {/* Search bar */}
          <div className="relative z-10 flex w-full flex-col gap-3 sm:flex-row sm:items-center max-w-4xl">
            <div className="flex h-12 w-full items-center gap-3 rounded-xl bg-white px-4 shadow-sm sm:flex-1">
              <svg className="text-gray-400 shrink-0" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                id="lomba-search"
                className="w-full bg-transparent text-[15px] text-gray-700 outline-none placeholder-gray-400"
                placeholder="Cari perlombaan (cth: Business Plan, Hackathon)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button
              className="h-12 w-full rounded-xl px-8 text-[15px] font-semibold shadow-md transition-all duration-150 active:scale-95 cursor-pointer sm:w-auto"
              style={{ background: "white", color: ACCENT }}
              onMouseEnter={(e) => { e.currentTarget.style.background = ACCENT_LIGHT; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "white"; }}
            >
              Cari Lomba
            </button>
          </div>

          {/* 4 Top Buttons */}
          <div className="flex flex-wrap gap-2 mt-5">
            {TOP_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTopTab(tab)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  background: activeTopTab === tab ? "white" : "rgba(255,255,255,0.15)",
                  color: activeTopTab === tab ? ACCENT : "white",
                  border: activeTopTab === tab ? "1px solid white" : "1px solid rgba(255,255,255,0.3)",
                  boxShadow: activeTopTab === tab ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
                }}
                onMouseEnter={(e) => { if (activeTopTab !== tab) e.currentTarget.style.background = "rgba(255,255,255,0.25)"; }}
                onMouseLeave={(e) => { if (activeTopTab !== tab) e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-7 lg:gap-8 xl:gap-10">

          {/* ── LEFT: Sidebar Filters ──────────────────────────────────── */}
          <aside className="lg:w-64 xl:w-72 shrink-0 flex flex-col gap-5">
            
            {/* Filter 1: Kategori Lomba */}
            <div className="rounded-2xl overflow-hidden bg-white shadow-sm" style={{ border: `1px solid ${BORDER}` }}>
              <div className="px-5 py-3.5 border-b flex items-center gap-2" style={{ borderColor: BORDER, background: SURFACE }}>
                <svg width="18" height="18" fill="none" stroke={ACCENT_DARK} strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <h2 className="text-sm font-bold" style={{ color: ACCENT_DARK }}>
                  Kategori Lomba
                </h2>
              </div>
              <div className="p-3 flex flex-col gap-0.5">
                {KEWIRAUSAHAAN_CATEGORIES.map((cat) => (
                  <CategoryPill
                    key={cat}
                    label={cat}
                    count={categoryCounts[cat] ?? 0}
                    active={activeCategory === cat}
                    onClick={() => setActiveCategory(cat)}
                  />
                ))}
              </div>
            </div>

            {/* Filter 2: Tingkatan Perlombaan */}
            <div className="rounded-2xl overflow-hidden bg-white shadow-sm" style={{ border: `1px solid ${BORDER}` }}>
              <div className="px-5 py-3.5 border-b flex items-center gap-2" style={{ borderColor: BORDER, background: SURFACE }}>
                <svg width="18" height="18" fill="none" stroke={ACCENT_DARK} strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <h2 className="text-sm font-bold" style={{ color: ACCENT_DARK }}>
                  Tingkatan Perlombaan
                </h2>
              </div>
              <div className="p-3 flex flex-col gap-0.5">
                {KEWIRAUSAHAAN_LEVELS.map((level) => (
                  <CategoryPill
                    key={level}
                    label={level}
                    active={activeLevel === level}
                    onClick={() => setActiveLevel(level)}
                  />
                ))}
              </div>
            </div>

            {/* Filter 3: Jumlah Peserta */}
            <div className="rounded-2xl overflow-hidden bg-white shadow-sm" style={{ border: `1px solid ${BORDER}` }}>
              <div className="px-5 py-3.5 border-b flex items-center gap-2" style={{ borderColor: BORDER, background: SURFACE }}>
                <svg width="18" height="18" fill="none" stroke={ACCENT_DARK} strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <h2 className="text-sm font-bold" style={{ color: ACCENT_DARK }}>
                  Jumlah Peserta
                </h2>
              </div>
              <div className="p-3 flex flex-col gap-0.5">
                {KEWIRAUSAHAAN_PARTICIPANTS.map((participant) => (
                  <CategoryPill
                    key={participant}
                    label={participant}
                    active={activeParticipant === participant}
                    onClick={() => setActiveParticipant(participant)}
                  />
                ))}
              </div>
            </div>

          </aside>

          {/* ── RIGHT: Main content ────────────────────────────────────── */}
          <main className="flex-1 min-w-0">

            {/* Result count & clear filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">
                {sorted.length} <span className="text-gray-500 font-medium text-base">Perlombaan Ditemukan</span>
              </h2>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm font-semibold flex items-center gap-1.5 transition-colors duration-150 cursor-pointer bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 w-fit"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                  Hapus Semua Filter
                </button>
              )}
            </div>

            {/* Card Grid */}
            {sorted.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-gray-400">
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Pencarian Tidak Ditemukan</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
                  Maaf, tidak ada perlombaan yang cocok dengan kriteria filter Anda. Silakan ubah kata kunci atau hapus beberapa filter.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-150 cursor-pointer shadow-sm"
                  style={{ background: ACCENT, color: "white" }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  Tampilkan Semua Lomba
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sorted.map((item) => (
                  <CompetitionCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
