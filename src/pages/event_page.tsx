import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer"
import { eventData } from "../data/events";
import { currentTheme } from "../theme/theme";
import { GREEN_DARK } from "../data/constants";

const GREEN = currentTheme.primary;
const GREEN_LIGHT = currentTheme.surfaceAlt;

const CATEGORY_OPTIONS = ["Semua Kategori", "Seminar", "Workshop", "Job Fair", "Rekrutmen"];
const TYPE_OPTIONS = ["Semua Tipe", "Offline", "Online"];

// ── Custom Searchable Dropdown ──────────────────────────────────────────────
interface DropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
}

function SearchableDropdown({ value, onChange, options, placeholder }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} className="relative z-50">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => { setOpen((p) => !p); setSearch(""); }}
        className="flex items-center gap-2 text-sm rounded-full pl-4 pr-3 py-2 cursor-pointer outline-none transition-all duration-150 whitespace-nowrap"
        style={{
          background: open ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.18)",
          border: "1px solid rgba(255,255,255,0.35)",
          color: "white",
        }}
      >
        <span>{value || placeholder}</span>
        <svg
          width="10" height="10" fill="white" viewBox="0 0 16 16"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
        >
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div
          className="absolute top-full left-0 mt-2 w-64 rounded-2xl shadow-xl overflow-hidden"
          style={{ background: "white", border: "1px solid #E5E7EB" }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-sm font-semibold text-gray-700">{value || placeholder}</span>
            <svg width="10" height="10" fill="#9CA3AF" viewBox="0 0 16 16">
              <path d="M7.247 4.86 2.451 10.342C1.885 10.987 2.345 12 3.204 12h9.592a1 1 0 0 0 .753-1.659L8.753 4.86a1 1 0 0 0-1.506 0z" />
            </svg>
          </div>

          {/* Search input */}
          <div className="px-3 py-2 border-b border-gray-100">
            <input
              autoFocus
              className="w-full bg-white rounded-full px-4 py-2 text-sm text-gray-700 outline-none placeholder-gray-400"
              style={{ border: "1px solid #E5E7EB" }}
              placeholder="Cari..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Options list */}
          <ul className="max-h-52 overflow-y-auto py-1 relative z-50">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-400">Tidak ditemukan</li>
            ) : (
              filtered.map((opt) => {
                const isActive = opt === value;
                return (
                  <li
                    key={opt}
                    onClick={() => { onChange(opt); setOpen(false); setSearch(""); }}
                    className="flex items-center px-4 py-3 text-sm cursor-pointer transition-colors duration-100"
                    style={{
                      background: isActive ? GREEN : "transparent",
                      color: isActive ? "white" : "#374151",
                      borderRadius: isActive ? "8px" : "0",
                      margin: isActive ? "2px 6px" : "0",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = "#F3F4F6";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {opt}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function EventPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Acara");
  const [sortBy, setSortBy] = useState("Terbaru");
  const [category, setCategory] = useState("Semua Kategori");
  const [type, setType] = useState("Semua Tipe");
  const [searchEvent, setSearchEvent] = useState("");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Handle tab change with navigation
  const handleTabChange = (tab: string) => {
    if (tab === "Artikel") {
      navigate("/artikel");
    } else {
      setActiveTab(tab);
    }
  };

  // Filter data
  const filtered = eventData.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(searchEvent.toLowerCase());
    const matchCategory = category === "Semua Kategori" || item.category === category;
    const matchType = type === "Semua Tipe" || item.type === type;
    return matchSearch && matchCategory && matchType;
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
        className="px-4 sm:px-6 py-16"
        style={{ background: "#5FBFBF" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-white opacity-75 mb-3">
            Kumpulan Acara & Event
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            Temukan Acara & Event
          </h1>
          <p className="text-sm text-white opacity-70 mb-8 max-w-lg leading-relaxed">
            Ikuti berbagai acara menarik seperti seminar, workshop, career fair, dan event lainnya untuk mengembangkan karier Anda.
          </p>

          {/* Search bar */}
          <div className="relative z-10 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex h-12 w-full items-center gap-3 rounded-xl bg-white px-4 shadow-sm sm:flex-1">
              <svg className="text-gray-400 shrink-0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
                placeholder="Cari acara anda"
                value={searchEvent}
                onChange={(e) => setSearchEvent(e.target.value)}
              />
            </div>

            <button
              className="h-12 w-full rounded-xl px-7 text-sm font-semibold shadow-md transition-all duration-150 active:scale-95 cursor-pointer sm:w-auto sm:min-w-44"
              style={{ background: "white", color: GREEN }}
              onMouseEnter={(e) => { e.currentTarget.style.background = GREEN_LIGHT; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "white"; }}
            >
              Cari Sekarang
            </button>
          </div>

          {/* Filter dropdowns */}
          <div className="flex flex-wrap gap-2 mt-5">
            <SearchableDropdown
              value={category}
              onChange={setCategory}
              options={CATEGORY_OPTIONS}
              placeholder="Semua Kategori"
            />
            <SearchableDropdown
              value={type}
              onChange={setType}
              options={TYPE_OPTIONS}
              placeholder="Semua Tipe"
            />
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
            acara
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
              <p className="mt-3 text-sm">Tidak ada acara ditemukan.</p>
            </div>
          ) : (
            sorted.map((item) => {
              const isHovered = hoveredCard === item.id;
              return (
                <div
                  key={item.id}
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
                    {/* Meta */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-md"
                        style={{ background: GREEN_LIGHT, color: GREEN_DARK }}
                      >
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-400">{item.date}</span>
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
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span
                        className="text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={{
                          background: item.type === "Online" ? currentTheme.surfaceStrong : currentTheme.surface,
                          color: item.type === "Online" ? currentTheme.primary : currentTheme.textMuted,
                        }}
                      >
                        {item.type}
                      </span>
                      <button
                        className="text-xs font-semibold transition-colors duration-150 cursor-pointer"
                        style={{ color: isHovered ? GREEN : "#9CA3AF" }}
                      >
                        Baca Selengkapnya →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
          <Footer />
    </div>
  );
}
