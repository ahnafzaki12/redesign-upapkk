import { useState } from "react"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import { CATEGORY, EDUCATIONS, GREEN, GREEN_DARK, GREEN_LIGHT, LOCATIONS } from "../data/constants"
import DetailModal from "../components/DetailModal"
import JobCard from "../components/JobCard"
import type { Job } from "../types/types"
import { jobsData } from "../data/jobData"
import SearchableDropdown from "../components/SearchableDropdown"
import { useNavigate } from "react-router-dom"

// ── Main Page ─────────────────────────────────────────────────────────────────
const job_page = () => {
    const [search, setSearch] = useState("")
    const [location, setLocation] = useState("Semua Lokasi")
    const [category, setCategory] = useState("Semua Kategori")
    const [duration, setDuration] = useState("Semua Durasi")
    const [education, setEducation] = useState("Semua Jenjang")
    const [sortBy, setSortBy] = useState("Terbaru")
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)
    const [activeTag, setActiveTag] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState("Pekerjaan");
    const navigate = useNavigate();

    const hasActiveFilter =
        category !== "Semua Kategori" ||
        location !== "Semua Lokasi" ||
        duration !== "Semua Durasi" ||
        education !== "Semua Jenjang" ||
        search !== "" ||
        activeTag !== null

    const resetFilters = () => {
        setCategory("Semua Kategori")
        setLocation("Semua Lokasi")
        setDuration("Semua Durasi")
        setEducation("Semua Jenjang")
        setSearch("")
        setActiveTag(null)
    }

    const handleTabChange = (tab: string) => {
        if (tab === "Magang") {
            navigate("/karir/magang");
        } else {
            setActiveTab(tab);
        }
    };

    const filtered = jobsData
        .filter((job) => job.tag === "Pekerjaan")
        .filter((job) => {
            const q = search.toLowerCase()
            const matchSearch =
                !q ||
                job.title.toLowerCase().includes(q) ||
                job.company.toLowerCase().includes(q) ||
                job.category.toLowerCase().includes(q)
            const matchLoc = location === "Semua Lokasi" || job.location === location
            const matchCat = category === "Semua Kategori" || job.category === category
            const matchDur = duration === "Semua Durasi" || job.duration === duration
            const matchEdu = education === "Semua Jenjang" || job.education.includes(education)
            const matchTag =
                !activeTag ||
                job.tags?.some((t) => t.includes(activeTag)) ||
                job.category === activeTag ||
                job.location.includes(activeTag)
            return matchSearch && matchLoc && matchCat && matchDur && matchEdu && matchTag
        })

    const sorted = [...filtered].sort((a, b) =>
        sortBy === "Terbaru" ? b.id - a.id : b.vacancies - a.vacancies
    )

    const totalVacancies = sorted.reduce((s, j) => s + j.vacancies, 0)

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* ── HERO ──────────────────────────────────────────────────────────── */}
            <section
                className="px-4 sm:px-6 pt-14 pb-20"
                style={{ background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)` }}
            >
                <div className="max-w-5xl mx-auto">
                    {/* Title row */}
                    <div className="flex flex-wrap items-end justify-between gap-5 mb-8">
                        <div>
                            <p
                                className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
                                style={{ color: "rgba(255,255,255,0.65)" }}
                            >
                                Lowongan Kerja
                            </p>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                                Lowongan Pekerjaan
                            </h1>
                            <p
                                className="mt-3 text-sm leading-relaxed max-w-md"
                                style={{ color: "rgba(255,255,255,0.72)" }}
                            >
                                Temukan pekerjaan terbaik dari perusahaan ternama dan mulai wujudkan karir impianmu hari ini.
                            </p>
                        </div>

                        {/* Stat chips */}
                        <div className="flex gap-3">
                            {[
                                { n: jobsData.filter((j) => j.tag === "Pekerjaan").length, label: "Lowongan" },
                                { n: jobsData.filter((j) => j.tag === "Pekerjaan").reduce((s, j) => s + j.vacancies, 0), label: "Posisi" },
                            ].map(({ n, label }) => (
                                <div
                                    key={label}
                                    className="rounded-2xl px-5 py-4 text-center"
                                    style={{ background: "rgba(255,255,255,0.15)" }}
                                >
                                    <p className="text-white text-2xl font-extrabold leading-none">{n}</p>
                                    <p
                                        className="text-xs font-semibold uppercase tracking-wider mt-1"
                                        style={{ color: "rgba(255,255,255,0.65)" }}
                                    >
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Search bar */}
                    <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-1.5 shadow-xl">
                        <svg
                            className="text-gray-400 shrink-0"
                            width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari pekerjaan, perusahaan, atau kategori..."
                            className="flex-1 py-3 text-sm text-gray-800 bg-transparent outline-none placeholder-gray-400"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="w-7 h-7 rounded-lg bg-gray-100 text-gray-500 text-base flex items-center justify-center cursor-pointer border-none"
                            >
                                ×
                            </button>
                        )}
                        <button
                            className="shrink-0 px-6 py-2.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer transition-opacity duration-150"
                            style={{ background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)` }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                            Cari
                        </button>
                    </div>
                </div>
            </section>

            {/* ── CONTENT ───────────────────────────────────────────────────────── */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-20" style={{ marginTop: -32 }}>

                {/* Filter bar */}
                <div className="bg-white rounded-2xl px-5 py-4 shadow-md mb-6 flex flex-wrap gap-3 items-center">
                    <SearchableDropdown value={category} onChange={setCategory} options={CATEGORY} placeholder="Kategori" />
                    <SearchableDropdown value={location} onChange={setLocation} options={LOCATIONS} placeholder="Lokasi" />
                    <SearchableDropdown value={education} onChange={setEducation} options={EDUCATIONS} placeholder="Pendidikan" />

                    {hasActiveFilter && (
                        <button
                            onClick={resetFilters}
                            className="ml-auto text-xs font-semibold px-3.5 py-2 rounded-lg bg-red-50 text-red-600 border-none cursor-pointer"
                        >
                            Reset Filter
                        </button>
                    )}
                </div>

                <div className="flex border-b border-gray-200 mb-6">
                    {["Pekerjaan", "Magang"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className="relative px-5 py-3 text-sm font-medium transition-colors duration-150 cursor-pointer"
                            style={{ color: activeTab === tab ? GREEN : "#6B7280" }}
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

                {/* Result header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <p className="text-sm text-gray-500">
                        Menampilkan{" "}
                        <span className="font-semibold text-gray-800">{sorted.length}</span> lowongan ·{" "}
                        <span className="font-semibold" style={{ color: GREEN }}>{totalVacancies} posisi</span> tersedia
                    </p>

                    <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
                        {["Terbaru", "Terpopuler"].map((opt) => (
                            <button
                                key={opt}
                                onClick={() => setSortBy(opt)}
                                className="text-xs font-bold px-4 py-1.5 rounded-lg border-none cursor-pointer transition-all duration-150"
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

                {/* Cards */}
                {sorted.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                        <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-4">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <p className="text-base font-semibold mb-2 text-gray-500">Tidak ada lowongan ditemukan</p>
                        <p className="text-sm mb-5">Coba ubah filter atau kata kunci pencarian</p>
                        <button
                            onClick={resetFilters}
                            className="px-6 py-2.5 rounded-xl text-sm font-bold border-none cursor-pointer"
                            style={{ background: GREEN_LIGHT, color: GREEN }}
                        >
                            Reset Filter
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {sorted.map((job) => (
                            <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
                        ))}
                    </div>
                )}
            </main>

            {/* Detail Modal */}
            {selectedJob && (
                <DetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
            )}

            <Footer />
        </div>
    )
}

export default job_page