import { useParams, useNavigate } from "react-router-dom";
import { jobsData } from "../data/jobData";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { GREEN, GREEN_DARK, GREEN_LIGHT } from "../data/constants";

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobsData.find((item) => item.id === Number(id));

  if (!job)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-700 mb-2">Pekerjaan tidak ditemukan</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)` }}
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
        className="px-4 sm:px-6 pt-14 pb-24"
        style={{ background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)` }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm font-semibold mb-8 border-none bg-transparent cursor-pointer"
            style={{ color: "rgba(255,255,255,0.75)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
            Kembali ke daftar lowongan
          </button>

          {/* Company + title row */}
          <div className="flex flex-wrap items-start gap-5">
            {/* Logo */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-base font-extrabold shrink-0 shadow-lg"
              style={{ background: job.logoColor ?? GREEN_DARK, letterSpacing: "-0.02em" }}
            >
              {job.logo}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                {job.company}
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">{job.title}</h1>

              {/* Quick meta chips */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { label: job.location },
                  { label: job.type },
                  { label: job.education.join(", ") },
                  ...(job.duration ? [{ label: job.duration }] : []),
                ].map(({ label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Vacancy badge */}
            <div
              className="rounded-2xl px-5 py-4 text-center shrink-0"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <p className="text-white text-2xl font-extrabold leading-none">{job.vacancies}</p>
              <p className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>
                Posisi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24" style={{ marginTop: -40 }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* ── Left: Description + Requirements ── */}
          <div className="md:col-span-2 flex flex-col gap-6">

            {/* Description card */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-base font-extrabold text-gray-800 mb-3">Deskripsi Pekerjaan</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements card */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h2 className="text-base font-extrabold text-gray-800 mb-4">Persyaratan</h2>
                <ul className="flex flex-col gap-3">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: GREEN_LIGHT }}
                      >
                        <svg width="10" height="10" fill="none" stroke={GREEN} strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags card */}
            {job.tags && job.tags.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h2 className="text-base font-extrabold text-gray-800 mb-4">Keunggulan Program</h2>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-full text-xs font-bold"
                      style={{ background: GREEN_LIGHT, color: GREEN }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Summary sidebar ── */}
          <div className="flex flex-col gap-5">

            {/* Apply CTA */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <button
                className="w-full py-3 rounded-xl text-sm font-bold text-white border-none cursor-pointer transition-opacity duration-150"
                style={{ background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)` }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                onClick={() => navigate(`/karir/lamar/${job.id}`)}
              >
                Lamar Sekarang
              </button>
              {job.deadline && (
                <p className="text-xs text-center text-gray-400 mt-3">
                  Batas lamar:{" "}
                  <span className="font-semibold text-gray-600">{job.deadline}</span>
                </p>
              )}
            </div>

            {/* Info summary */}
            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col gap-4">
              <h2 className="text-base font-extrabold text-gray-800">Informasi Lowongan</h2>

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
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</span>
                  <span className="text-sm font-semibold text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}