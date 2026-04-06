// DetailModal.tsx
import { useEffect } from "react"
import { daysLeft } from "../helpers/dateHelpers"
import { GREEN, GREEN_DARK, GREEN_LIGHT } from "../data/constants"
import type { Job } from "../types/types"
import { Link, useNavigate } from "react-router-dom"



interface DetailModalProps {
    job: Job
    onClose: () => void
}

export default function DetailModal({ job, onClose }: DetailModalProps) {
    const dl = daysLeft(job.deadline)
    const navigate = useNavigate();
    

    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
        document.addEventListener("keydown", h)
        document.body.style.overflow = "hidden"
        return () => {
            document.removeEventListener("keydown", h)
            document.body.style.overflow = ""
        }
    }, [onClose])

    return (
        <div
            className="fixed inset-0 z-1000 flex items-center justify-center p-4 sm:p-6"
            style={{ background: "rgba(0,0,0,0.5)" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col relative shadow-2xl overflow-hidden">
                {/* Header */}
                <div
                    className="p-7 shrink-0"
                    style={{ background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)` }}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-white text-xl cursor-pointer border-none"
                        style={{ background: "rgba(255,255,255,0.2)" }}
                    >
                        ×
                    </button>

                    <div className="flex items-start gap-4 mb-4">
                        <div
                            className="w-13 h-13 rounded-xl flex items-center justify-center text-white text-xs font-bold tracking-wide shrink-0"
                            style={{ width: 52, height: 52, background: job.logoColor, border: "2px solid rgba(255,255,255,0.3)" }}
                        >
                            {job.logo}
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                                {job.company}
                            </p>
                            <h2 className="text-base font-bold leading-snug text-white">{job.title}</h2>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {[job.location, job.duration, job.education?.join(", ")]
                            .filter(tag => tag && tag.trim() !== "") // Menghapus yang undefined, null, atau string kosong
                            .map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                                    style={{ background: "rgba(255,255,255,0.2)" }}
                                >
                                    {tag}
                                </span>
                            ))
                        }
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-7 scrollbar-thin scrollbar-thumb-gray-200">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {[
                            { label: "Lowongan", value: `${job.vacancies} Posisi`, color: GREEN },
                            { label: "Deadline", value: job.deadline.replace(" 2026", ""), color: dl.urgent ? "#DC2626" : "#374151" },
                            { label: "Sisa Waktu", value: dl.label, color: dl.urgent ? "#DC2626" : GREEN },
                        ].map((s) => (
                            <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                                <p className="text-xs text-gray-400 font-semibold mb-1">{s.label}</p>
                                <p className="text-xs font-bold" style={{ color: s.color }}>{s.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Salary */}
                    <div
                        className="flex items-center gap-3 rounded-xl p-3.5 mb-5"
                        style={{ background: GREEN_LIGHT }}
                    >
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: GREEN_DARK }}>Kompensasi</p>
                            <p className="text-sm font-bold" style={{ color: GREEN_DARK }}>{job.salary}</p>
                        </div>
                    </div>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                        {job.tags?.map((tag) => (
                            <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Description */}
                    <h3 className="text-sm font-bold text-gray-900 mb-2">Deskripsi Program</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{job.description}</p>

                    {/* Requirements */}
                    <h3 className="text-sm font-bold text-gray-900 mb-3">Persyaratan</h3>
                    <ul className="flex flex-col gap-2.5 mb-6">
                        {job.requirements?.map((r) => (
                            <li key={r} className="flex items-center gap-3 text-sm text-gray-700">
                                <span
                                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                    style={{ background: GREEN_LIGHT }}
                                >
                                    <svg width="10" height="10" fill={GREEN} viewBox="0 0 16 16">
                                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                    </svg>
                                </span>
                                {r}
                            </li>
                        ))}
                    </ul>

                    {/* CTA Section */}
                    <div className="flex gap-3 mt-4">
                        {/* Tombol External Link */}
                        <Link
                            to={`/karir/detail/${job.id}`}
                            className="flex-1 cursor-pointer py-3.5 rounded-xl text-center font-bold text-sm border-2 border-gray-100 text-gray-700 hover:bg-gray-50 transition-all"
                        >
                            Detail
                        </Link>

                        {/* Tombol Daftar Utama */}
                        <button
                            className="flex-2 py-3.5 rounded-xl text-white font-bold text-sm cursor-pointer border-none transition-opacity duration-150"
                            style={{ background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)` }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                            onClick={() => navigate(`/karir/lamar/${job.id}`)}
                        >
                            Lamar Sekarang →
                        </button>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-3">
                        Diposting {job.posted} · Ditutup {job.deadline}
                    </p>
                </div>
            </div>
        </div>
    )
}