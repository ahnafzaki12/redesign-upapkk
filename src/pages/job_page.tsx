// job_page.tsx
import { useEffect, useState } from "react"
import Pagination from "../components/Pagination"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import DetailModal from "../components/DetailModal"
import JobCard from "../components/JobCard"
import type { Job } from "../types/types"
import { jobsData } from "../data/jobData"
import { useNavigate } from "react-router-dom"
import { FilterSidebar, FilterDrawer } from "../components/sidebar"
import { currentTheme } from "../theme/theme"

const ACCENT = currentTheme.primary
const ACCENT_DARK = currentTheme.heroEnd
const ACCENT_LIGHT = currentTheme.surfaceAlt
const HERO_BG = currentTheme.heroStart

// ── Main Page ─────────────────────────────────────────────────────────────────
const job_page = () => {
    const [search, setSearch] = useState("")
    const [location, setLocation] = useState("Semua Lokasi")
    const [category, setCategory] = useState("Semua Kategori")
    const [duration, setDuration] = useState("Semua Durasi")
    const [education, setEducation] = useState<string[]>(["Semua Jenjang"])
    const [sortBy] = useState("Terbaru")
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)
    const [activeTab, setActiveTab] = useState("Pekerjaan")
    const [type, setType] = useState("Semua Tipe")
    const [drawerOpen, setDrawerOpen] = useState(false)
    const navigate = useNavigate()

    const hasActiveFilter =
        category !== "Semua Kategori" ||
        location !== "Semua Lokasi" ||
        duration !== "Semua Durasi" ||
        !education.includes("Semua Jenjang") ||
        type !== "Semua Tipe" ||
        search !== ""

    const resetFilters = () => {
        setCategory("Semua Kategori")
        setLocation("Semua Lokasi")
        setDuration("Semua Durasi")
        setType("Semua Tipe")
        setEducation(["Semua Jenjang"])
        setSearch("")
    }

    const handleTabChange = (tab: string) => {
        if (tab === "Magang") { navigate("/karir/magang"); return }
        if (tab === "Perusahaan") { navigate("/karir/perusahaan"); return }
        setActiveTab(tab)
    }

    const filtered = jobsData
        .filter(job => job.tag === "Pekerjaan")
        .filter(job => {
            const q = search.toLowerCase()
            const matchSearch = !q || job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q) || job.category.toLowerCase().includes(q)
            const matchLoc = location === "Semua Lokasi" || job.location === location
            const matchCat = category === "Semua Kategori" || job.category === category
            const matchDur = duration === "Semua Durasi" || job.duration === duration
            const matchEdu = education.includes("Semua Jenjang") || job.education.some(e => education.includes(e))
            const matchType = type === "Semua Tipe" || job.type === type
            return matchSearch && matchLoc && matchCat && matchDur && matchEdu && matchType
        })

    const sorted = [...filtered].sort((a, b) =>
        sortBy === "Terbaru" ? b.id - a.id : b.vacancies - a.vacancies
    )

    const totalVacancies = sorted.reduce((s, j) => s + j.vacancies, 0)

    // Count active filters for badge
    const activeFilterCount = [
        category !== "Semua Kategori",
        location !== "Semua Lokasi",
        duration !== "Semua Durasi",
        !education.includes("Semua Jenjang"),
        type !== "Semua Tipe",
    ].filter(Boolean).length

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 4

    useEffect(() => {
        setCurrentPage(1)
    }, [search, location, category, duration, education, sortBy, type])

    const totalPages = Math.ceil(sorted.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedJobs = sorted.slice(startIndex, startIndex + itemsPerPage)

    return (
        <div className="min-h-screen" style={{ background: "#F3F4F6" }}>
            <Navbar />

            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <section className="px-4 sm:px-6 py-16" style={{ background: HERO_BG }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Cari Pekerjaan Impianmu
                    </h1>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Lihat berbagai lowongan pekerjaan terbaru dari perusahaan terkemuka di Indonesia.
                    </p>
                </div>
            </section>

            {/* ── BODY ─────────────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-20">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-5">
                    <a href="/" className="hover:text-gray-700 cursor-pointer transition-colors">
                        Beranda
                    </a>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                    <span className="font-semibold text-gray-800">Pekerjaan</span>
                </nav>

                {/* Search bar + mobile filter button */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="flex flex-1 items-center gap-3 bg-white border border-gray-200 rounded-md px-4 py-1 shadow-sm">
                        <svg className="text-gray-400 shrink-0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Cari Pekerjaan, perusahaan, atau kategori"
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
                        {activeFilterCount > 0 && (
                            <span
                                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white flex items-center justify-center"
                                style={{ fontSize: "10px", background: "#EF4444" }}
                            >
                                {activeFilterCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* Sidebar + Cards — same row */}
                <div className="flex gap-5 items-start">

                    {/* Sidebar — hidden on mobile/tablet, visible on lg+ */}
                    <div className="hidden lg:block">
                        <FilterSidebar
                            location={location}
                            setLocation={setLocation}
                            category={category}
                            setCategory={setCategory}
                            education={education}
                            setEducation={setEducation}
                            duration={duration}
                            showDuration={false}
                            setDuration={setDuration}
                            hasActiveFilter={hasActiveFilter}
                            resetFilters={resetFilters}
                            type={type}
                            setType={setType}
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        {/* Tabs + sort */}
                        <div className="flex items-center justify-between border-b border-gray-200 mb-5">
                            <div className="flex">
                                {["Pekerjaan", "Magang", "Perusahaan"].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => handleTabChange(tab)}
                                        className="relative px-5 py-3 text-sm font-medium transition-colors duration-150 cursor-pointer border-none bg-transparent"
                                        style={{ color: activeTab === tab ? ACCENT : "#6B7280" }}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <span
                                                className="absolute bottom-0 left-0 right-0 h-0.5"
                                                style={{ background: ACCENT }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-3 pb-1">
                                <span className="text-xs text-gray-400 hidden sm:block">
                                    {sorted.length} lowongan ·{" "}
                                    <span style={{ color: ACCENT }}>{totalVacancies} posisi</span>
                                </span>
                            </div>
                        </div>

                        {/* Cards */}
                        {sorted.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded text-gray-400">
                                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-3">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.35-4.35" />
                                </svg>
                                <p className="text-sm font-semibold text-gray-500 mb-1">Tidak ada lowongan ditemukan</p>
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
                                    {paginatedJobs.map(job => (
                                        <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
                                    ))}
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
            </div>

            {/* Mobile filter drawer */}
            <FilterDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                location={location}
                setLocation={setLocation}
                category={category}
                setCategory={setCategory}
                education={education}
                setEducation={setEducation}
                duration={duration}
                showDuration={false}
                setDuration={setDuration}
                hasActiveFilter={hasActiveFilter}
                resetFilters={resetFilters}
                type={type}
                setType={setType}
            />

            {selectedJob && (
                <DetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
            )}

            <Footer />
        </div>
    )
}

export default job_page