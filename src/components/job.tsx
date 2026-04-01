import { useState, useRef, useEffect } from "react";

const jobData = [
  {
    id: 1,
    company: "PT Yamaha Motor R&D Indonesia",
    logo: "YMH",
    logoColor: "#E63946",
    title: "Body Design",
    education: ["D4", "S1"],
    vacancies: 1,
    location: "Jakarta",
    type: "Full Time",
    category: "Engineering",
    posted: "13 Maret 2026",
    deadline: "30 April 2026",
    description: "Merancang dan mengembangkan desain body kendaraan bermotor sesuai standar internasional.",
    tag: "Pekerjaan",
  },
  {
    id: 2,
    company: "PT. Brexa Raya Indonesia",
    logo: "BRX",
    logoColor: "#0077B6",
    title: "BE The Next Global IT Professional — Opportunity to Japan with Engineering Visa!",
    education: ["S1", "S2"],
    vacancies: 3,
    location: "Tokyo, Japan",
    type: "Contract",
    category: "IT",
    posted: "13 Maret 2026",
    deadline: "20 April 2026",
    description: "Kesempatan berkarir di Jepang sebagai Global Engineer dengan visa teknik khusus.",
    tag: "Magang",
  },
  {
    id: 3,
    company: "PT BAS Bumi Alam Segar",
    logo: "BAS",
    logoColor: "#6A4C93",
    title: "Electronics / Electrical Engineering, Software Engineering, Production",
    education: ["D3", "D4", "S1"],
    vacancies: 5,
    location: "Surabaya",
    type: "Internship",
    category: "Engineering",
    posted: "12 Maret 2026",
    deadline: "25 April 2026",
    description: "Bergabunglah dalam tim engineering kami untuk mengembangkan solusi teknik terapan.",
    tag: "Magang",
  },
  {
    id: 4,
    company: "PT Shopfloor Leader Dev",
    logo: "SLD",
    logoColor: "#F4A261",
    title: "Shopfloor Leader Development Program (SLDP)",
    education: ["S1"],
    vacancies: 2,
    location: "Bekasi",
    type: "Full Time",
    category: "Management",
    posted: "11 Maret 2026",
    deadline: "15 April 2026",
    description: "Program pengembangan pemimpin lapangan produksi untuk mendorong efisiensi operasional.",
    tag: "Pekerjaan",
  },
];

const CATEGORY_OPTIONS = [
  "Semua Kategori", "Accounting", "Admin & Clerical Support", "Advertising",
  "Aerospace", "Agriculture & Forestry", "Engineering", "IT", "Management", "Finance",
];
const POSITION_OPTIONS = [
  "Semua Jabatan", "Staff", "Supervisor", "Manager", "Intern",
];
const TYPE_OPTIONS = [
  "Semua Tipe", "Full Time", "Part Time", "Contract", "Internship",
];

const GREEN = "#00A63E";
const GREEN_DARK = "#008C34";
const GREEN_LIGHT = "#E6F7EC";

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
    <div ref={ref} className="relative w-full lg:w-auto">
      {/* Trigger — full-width on all screens */}
      <button
        type="button"
        onClick={() => { setOpen((p) => !p); setSearch(""); }}
        className="flex items-center justify-between gap-2 text-sm rounded-full pl-4 pr-3 py-2 cursor-pointer outline-none transition-all duration-150 w-full lg:w-auto"
        style={{
          background: open ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.18)",
          border: "1px solid rgba(255,255,255,0.35)",
          color: "white",
        }}
      >
        <span className="truncate">{value || placeholder}</span>
        <svg
          width="10" height="10" fill="white" viewBox="0 0 16 16"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
        >
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div
          className="absolute top-full left-0 mt-2 w-full lg:w-64 min-w-[220px] rounded-2xl shadow-xl z-50 overflow-hidden"
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
          <ul className="max-h-52 overflow-y-auto py-1">
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

// ── Main Component ───────────────────────────────────────────────────────────
export default function Job() {
  const [activeTab, setActiveTab] = useState("Pekerjaan");
  const [sortBy, setSortBy] = useState("Terbaru");
  const [category, setCategory] = useState("Semua Kategori");
  const [position, setPosition] = useState("Semua Jabatan");
  const [type, setType] = useState("Semua Tipe");
  const [searchJob, setSearchJob] = useState("");
  const [searchLoc, setSearchLoc] = useState("");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);

  const filtered = jobData.filter((job) => {
    const matchTab = job.tag === activeTab;
    const matchSearch =
      job.title.toLowerCase().includes(searchJob.toLowerCase()) ||
      job.company.toLowerCase().includes(searchJob.toLowerCase());
    const matchLoc = job.location.toLowerCase().includes(searchLoc.toLowerCase());
    const matchCat = category === "Semua Kategori" || job.category === category;
    const matchType = type === "Semua Tipe" || job.type === type;
    return matchTab && matchSearch && matchLoc && matchCat && matchType;
  });

  const sorted = [...filtered].sort((a, b) =>
    sortBy === "Terbaru" ? b.id - a.id : b.vacancies - a.vacancies
  );

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-white">

      {/* ── HERO ── */}
      <div
        className="px-4 sm:px-6 py-10 md:py-16 rounded-4xl"
        style={{ background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)` }}
      >
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-white opacity-75 mb-3">
            Karir & Magang
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            Informasi Lowongan
          </h1>
          <p className="text-sm text-white opacity-70 mb-8 max-w-lg leading-relaxed">
            Temukan pekerjaan terbaik Anda disini dengan berbagai partner yang telah bekerja sama dengan Kami
          </p>

          {/* ── Search bar: stacks vertically & centered on mobile/tablet ── */}
          <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-stretch">
            {/* Job search input */}
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 h-12 w-full lg:flex-1 shadow-sm">
              <svg className="text-gray-400 shrink-0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-400"
                placeholder="Cari pekerjaan anda"
                value={searchJob}
                onChange={(e) => setSearchJob(e.target.value)}
              />
            </div>

            {/* Location input */}
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 h-12 w-full lg:w-56 shadow-sm">
              <svg className="text-gray-400 shrink-0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              <input
                className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-400"
                placeholder="Lokasi Pekerjaan"
                value={searchLoc}
                onChange={(e) => setSearchLoc(e.target.value)}
              />
            </div>

            {/* Search button */}
            <button
              className="h-12 px-7 rounded-xl text-sm font-semibold shadow-md transition-all duration-150 active:scale-95 w-full lg:w-auto"
              style={{ background: "white", color: GREEN }}
              onMouseEnter={(e) => { e.currentTarget.style.background = GREEN_LIGHT; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "white"; }}
            >
              Cari Sekarang
            </button>
          </div>

          {/* ── Filter dropdowns: stacks vertically & centered on mobile/tablet ── */}
          <div className="flex flex-col items-center gap-3 mt-5 lg:flex-row lg:flex-wrap lg:items-center">
            <SearchableDropdown
              value={category}
              onChange={setCategory}
              options={CATEGORY_OPTIONS}
              placeholder="Kategori"
            />
            <SearchableDropdown
              value={position}
              onChange={setPosition}
              options={POSITION_OPTIONS}
              placeholder="Jabatan"
            />
            <SearchableDropdown
              value={type}
              onChange={setType}
              options={TYPE_OPTIONS}
              placeholder="Tipe"
            />
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6">

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {["Pekerjaan", "Magang"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-5 py-3 text-sm font-medium transition-colors duration-150"
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
            lowongan
          </p>

          <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
            {["Terbaru", "Terpopuler"].map((opt) => (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                className="text-xs font-semibold px-4 py-1.5 rounded-md transition-all duration-150"
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sorted.length === 0 ? (
            <div className="col-span-2 flex flex-col items-center justify-center py-20 text-gray-400">
              <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <p className="mt-3 text-sm">Tidak ada lowongan ditemukan.</p>
            </div>
          ) : (
            sorted.map((job) => {
              const isHovered = hoveredCard === job.id;
              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 flex flex-col gap-4 transition-all duration-200"
                  style={{
                    border: isHovered ? `1.5px solid ${GREEN}` : "1.5px solid #F0F0F0",
                    boxShadow: isHovered
                      ? `0 12px 32px rgba(0,166,62,0.1)`
                      : "0 2px 8px rgba(0,0,0,0.04)",
                    transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                  }}
                  onMouseEnter={() => setHoveredCard(job.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Top */}
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 tracking-wide"
                      style={{ background: job.logoColor }}
                    >
                      {job.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 truncate">
                        {job.company}
                      </p>
                      <p className="text-base font-bold text-gray-800 leading-snug line-clamp-2">
                        {job.title}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2">
                    {job.education.map((edu) => (
                      <span
                        key={edu}
                        className="text-xs font-semibold px-2.5 py-1 rounded-md"
                        style={{ background: GREEN_LIGHT, color: GREEN_DARK }}
                      >
                        {edu}
                      </span>
                    ))}
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-600">
                      {job.type}
                    </span>
                    <span
                      className="ml-auto text-xs font-bold px-3 py-1 rounded-full text-white"
                      style={{ background: GREEN }}
                    >
                      {job.vacancies} Lowongan
                    </span>
                  </div>

                  {/* Footer */}
                  <div
                    className="flex items-center justify-between pt-4"
                    style={{ borderTop: "1px solid #F3F4F6" }}
                  >
                    <div className="flex gap-4 sm:gap-6">
                      <div>
                        <p className="text-xs text-gray-400">Deadline</p>
                        <p className="text-xs font-semibold text-gray-700 mt-0.5">{job.deadline}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Lokasi</p>
                        <p className="text-xs font-semibold text-gray-700 mt-0.5">{job.location}</p>
                      </div>
                    </div>

                    <button
                      className="text-xs cursor-pointer font-semibold px-5 py-2 rounded-lg transition-all duration-150 active:scale-95 shrink-0"
                      style={{
                        background: hoveredBtn === job.id ? GREEN : GREEN_LIGHT,
                        color: hoveredBtn === job.id ? "white" : GREEN,
                      }}
                      onMouseEnter={() => setHoveredBtn(job.id)}
                      onMouseLeave={() => setHoveredBtn(null)}
                    >
                      Lamar →
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}