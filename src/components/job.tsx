import { useState } from "react";
import { jobsData } from "../data/jobData";
import { CATEGORY, EDUCATIONS, GREEN, GREEN_DARK, GREEN_LIGHT, LOCATIONS, TYPE_OPTIONS } from "../data/constants";
import SearchableDropdown from "./SearchableDropdown";
import MagangCard from "./JobCard";
import DetailModal from "./DetailModal";
import type { Job } from "../types/types";


// ── Main Component ───────────────────────────────────────────────────────────
export default function Job() {
  const [activeTab, setActiveTab] = useState("Pekerjaan");
  const [sortBy, setSortBy] = useState("Terbaru");
  const [category, setCategory] = useState("Semua Kategori");
  const [location, setLocation] = useState("Semua Lokasi");
  const [education, setEducation] = useState("Semua Jenjang");
  const [type, setType] = useState("Semua Tipe");
  const [searchJob, setSearchJob] = useState("");
  const [searchLoc, setSearchLoc] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)


  const filtered = jobsData.filter((job) => {
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
        className="px-4 sm:px-6 py-10 md:py-4 rounded-xl"
        style={{ background: GREEN_DARK }}
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
              options={CATEGORY}
              placeholder="Kategori"
            />
            <SearchableDropdown
              value={location}
              onChange={setLocation}
              options={LOCATIONS}
              placeholder="Lokasi"
            />
            <SearchableDropdown
              value={education}
              onChange={setEducation}
              options={EDUCATIONS}
              placeholder="Jenjang Pendidikan"
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
            sorted.slice(0, 4).map((job) => {
              return (
                <MagangCard
                  key={job.id}
                  job={job}
                  onClick={() => setSelectedJob(job)}
                />
              )
            })
          )}

          {selectedJob && (
            <DetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
          )}
        </div>
      </div>
    </div>
  );
}