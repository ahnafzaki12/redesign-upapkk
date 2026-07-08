import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import CompanyCard from "../components/CompanyCard";
import Pagination from "../components/Pagination";
import { CompanyFilterSidebar, CompanyFilterDrawer } from "../components/sidebar";
import { companiesData } from "../data/companyData";
import { jobsData } from "../data/jobData";
import { currentTheme } from "../theme/theme";

const ACCENT = currentTheme.primary;
const ACCENT_DARK = currentTheme.heroEnd;
const ACCENT_LIGHT = currentTheme.surfaceAlt;
const HERO_BG = currentTheme.heroStart;

export default function CompanyPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Semua Lokasi");
  const [industry, setIndustry] = useState("Semua Industri");
  const [pkg, setPkg] = useState("Semua Paket");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 4;

  const hasActiveFilter =
    location !== "Semua Lokasi" ||
    industry !== "Semua Industri" ||
    pkg !== "Semua Paket" ||
    search !== "";

  const resetFilters = () => {
    setLocation("Semua Lokasi");
    setIndustry("Semua Industri");
    setPkg("Semua Paket");
    setSearch("");
  };

  const filtered = companiesData.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase());
    const matchLocation = location === "Semua Lokasi" || c.location === location;
    const matchIndustry = industry === "Semua Industri" || c.industry === industry;
    const matchPkg = pkg === "Semua Paket" || c.package === pkg;
    return matchSearch && matchLocation && matchIndustry && matchPkg;
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, location, industry, pkg]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCompanies = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="px-4 sm:px-6 py-16" style={{ background: HERO_BG }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Perusahaan Mitra</h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Temukan perusahaan terbaik yang bermitra dengan kami dan lihat lowongan yang tersedia.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-5">
          <a href="/" className="hover:text-gray-700 cursor-pointer">Beranda</a>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg>
          <span className="font-semibold text-gray-800">Perusahaan</span>
        </nav>

        {/* Search bar + mobile filter button */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex flex-1 items-center gap-3 bg-white border border-gray-200 rounded px-4 py-1 shadow-sm">
            <svg className="text-gray-400 shrink-0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari perusahaan atau industri"
              className="flex-1 py-2.5 text-sm text-gray-700 bg-transparent outline-none placeholder-gray-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="w-6 h-6 flex items-center justify-center text-gray-400 border-none bg-transparent cursor-pointer text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>

          {/* Filter button — visible only on mobile/tablet (hidden on lg+) */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden relative flex items-center justify-center w-11 h-11 rounded shrink-0 border-none cursor-pointer transition-colors"
            style={{ background: ACCENT_DARK }}
            aria-label="Open filters"
          >
            <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 6h18M7 12h10M11 18h2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Sidebar + Cards — same row */}
        <div className="flex gap-5 items-start">

          {/* Sidebar — hidden on mobile/tablet, visible on lg+ */}
          <div className="hidden lg:block">
            <CompanyFilterSidebar
              location={location}
              setLocation={setLocation}
              industry={industry}
              setIndustry={setIndustry}
              pkg={pkg}
              setPkg={setPkg}
              hasActiveFilter={hasActiveFilter}
              resetFilters={resetFilters}
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex items-center justify-between border-b border-gray-200 mb-5">
              <div className="flex">
                {["Pekerjaan", "Magang", "Perusahaan"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      if (tab === "Pekerjaan") navigate("/karir/pekerjaan");
                      else if (tab === "Magang") navigate("/karir/magang");
                    }}
                    className="relative px-5 py-3 text-sm font-medium transition-colors duration-150 cursor-pointer border-none bg-transparent"
                    style={{ color: tab === "Perusahaan" ? ACCENT : "#6B7280" }}
                  >
                    {tab}
                    {tab === "Perusahaan" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: ACCENT }} />
                    )}
                  </button>
                ))}
              </div>

              {/* Count on the right */}
              <span className="text-xs text-gray-400 hidden sm:block">
                Menampilkan <span style={{ color: ACCENT, fontWeight: "600" }}>{filtered.length} perusahaan</span>
              </span>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded text-gray-400">
                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-3">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <p className="text-sm font-semibold text-gray-500 mb-1">Tidak ada perusahaan ditemukan</p>
                <p className="text-xs mb-4">Coba ubah filter atau kata kunci pencarian</p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2 rounded text-sm font-semibold border-none cursor-pointer"
                  style={{ background: ACCENT_LIGHT, color: ACCENT }}
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paginatedCompanies.map((company) => {
                    const jobCount = jobsData.filter((j) => j.companyId === company.id).length;
                    return (
                      <CompanyCard
                        key={company.id}
                        company={company}
                        jobCount={jobCount}
                        onClick={() => navigate(`/karir/perusahaan/${company.id}`)}
                      />
                    );
                  })}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>

        {/* Mobile filter drawer */}
        <CompanyFilterDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          location={location}
          setLocation={setLocation}
          industry={industry}
          setIndustry={setIndustry}
          pkg={pkg}
          setPkg={setPkg}
          hasActiveFilter={hasActiveFilter}
          resetFilters={resetFilters}
        />
      </div>

      <Footer />
    </div>
  );
}