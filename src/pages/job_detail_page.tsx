import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { jobsData } from "../data/jobData";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { currentTheme } from "../theme/theme";
import { Heart } from "lucide-react";

const ACCENT = currentTheme.primary;
const ACCENT_DARK = currentTheme.heroEnd;
const ACCENT_LIGHT = currentTheme.surfaceAlt;
const HERO_BG = currentTheme.heroEnd;

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const job = jobsData.find((item) => item.id === Number(id));

  if (!job)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-700 mb-2">Pekerjaan tidak ditemukan</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)` }}
          >
            Kembali
          </button>
        </div>
      </div>
    );

  const isInternship = job.tag === "Magang";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        className="px-4 sm:px-6 pt-14 pb-20"
        style={{ background: HERO_BG }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 mb-8">
            <button
              onClick={() => navigate("/")}
              className="text-xs font-semibold border-none bg-transparent cursor-pointer transition-colors duration-150"
              style={{ color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              Beranda
            </button>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: "rgba(255,255,255,0.4)" }}>
              <path d="m9 18 6-6-6-6" />
            </svg>
            <button
              onClick={() => navigate(isInternship ? "/karir/magang" : "/karir/pekerjaan")}
              className="text-xs font-semibold border-none bg-transparent cursor-pointer transition-colors duration-150"
              style={{ color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              {isInternship ? "Magang" : "Pekerjaan"}
            </button>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: "rgba(255,255,255,0.4)" }}>
              <path d="m9 18 6-6-6-6" />
            </svg>
            <span
              className="text-xs font-semibold truncate max-w-50"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              {job.title}
            </span>
          </nav>

          {/* Title row */}
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="flex items-start gap-4">
              {/* Logo */}
              <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 overflow-hidden bg-white shadow-md border border-white/20">
                {job.logoUrl ? (
                  <img
                    src={job.logoUrl}
                    alt={job.company}
                    className="w-full h-full object-contain p-1"
                    onError={(e) => { e.currentTarget.style.display = "none" }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-white text-xs font-black tracking-wide"
                    style={{ background: job.logoColor }}
                  >
                    {job.logo}
                  </div>
                )}
              </div>

              <div>
                <p
                  className="text-xs font-bold uppercase mb-1.5 text-white"
                >
                  {job.company}
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  {job.title}
                </h1>

                {/* Meta chips */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    job.location,
                    job.type,
                    job.education.join(", "),
                    ...(job.duration ? [job.duration] : []),
                  ].map((label) => (
                    <span
                      key={label}
                      className="px-3 py-1 rounded-lg text-xs font-semibold"
                      style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24" style={{ marginTop: -32 }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* ── Left: Description + Requirements ── */}
          <div className="md:col-span-2 flex flex-col gap-5">

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Deskripsi Pekerjaan</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Persyaratan</h2>
                <ul className="flex flex-col gap-3">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                        style={{ background: ACCENT_LIGHT }}
                      >
                        <svg width="10" height="10" fill="none" stroke={ACCENT} strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {job.tags && job.tags.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Keunggulan Program</h2>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold"
                      style={{ background: ACCENT_LIGHT, color: ACCENT }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Sidebar ── */}
          <div className="flex flex-col gap-4">

            {/* Apply CTA */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
              <button
                className="w-full py-3 rounded-lg text-sm font-bold text-white border-none cursor-pointer transition-opacity duration-150"
                style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)` }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                onClick={() => navigate(`/karir/lamar/${job.id}`)}
              >
                Lamar Sekarang
              </button>
              
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`group w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold border-2 cursor-pointer transition-colors duration-200 active:scale-95 ${
                  isSaved 
                    ? "bg-red-50 border-red-100 text-red-500" 
                    : "bg-white border-gray-200 text-gray-700 hover:border-red-400 hover:text-red-500 hover:bg-red-50"
                }`}
              >
                <Heart size={18} className={isSaved ? "fill-red-500 text-red-500" : "text-gray-400 group-hover:text-red-500 transition-colors"} />
                {isSaved ? "Tersimpan di Wishlist" : `Simpan ${isInternship ? "Magang" : "Pekerjaan"}`}
              </button>

              {job.deadline && (
                <p className="text-xs text-center text-gray-400 mt-2">
                  Batas lamar:{" "}
                  <span className="font-semibold text-gray-600">{job.deadline}</span>
                </p>
              )}
            </div>

            {/* Info summary */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-sm font-extrabold text-gray-800 mb-4 uppercase tracking-wide">Informasi Lowongan</h2>
              <div className="flex flex-col divide-y divide-gray-50">
                {[
                  { label: "Perusahaan", value: job.company },
                  { label: "Kategori", value: job.category },
                  { label: "Tipe", value: isInternship ? "Magang" : "Pekerjaan" },
                  { label: "Lokasi", value: job.location },
                  ...(job.salary ? [{ label: "Gaji / Uang Saku", value: job.salary }] : []),
                  ...(job.duration ? [{ label: "Durasi", value: job.duration }] : []),
                  { label: "Pendidikan", value: job.education.join(", ") },
                  ...(job.posted ? [{ label: "Diposting", value: job.posted }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</span>
                    <span className="text-sm font-semibold text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}