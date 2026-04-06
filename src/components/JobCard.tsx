// MagangCard.tsx
import { useState } from "react"
import { daysLeft } from "../helpers/dateHelpers"
import { GREEN, GREEN_DARK, GREEN_LIGHT } from "../data/constants"
import type { Job } from "../types/types"


interface MagangCardProps {
    job: Job
    onClick: () => void
}

export default function MagangCard({ job, onClick }: MagangCardProps) {
    const [hovered, setHovered] = useState(false)
    const dl = daysLeft(job.deadline)

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="bg-white rounded-2xl p-5 flex flex-col gap-4 cursor-pointer"
            style={{
                border: hovered ? `1.5px solid ${GREEN}` : "1.5px solid #F0F0F0",
                boxShadow: hovered ? `0 12px 32px rgba(0,166,62,0.12)` : "0 2px 8px rgba(0,0,0,0.04)",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
            }}
        >
            {/* Top */}
            <div className="flex items-start gap-3.5">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xs font-black tracking-wide shrink-0"
                    style={{ background: job.logoColor }}
                >
                    {job.logo}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 truncate">
                        {job.company}
                    </p>
                    <p className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">{job.title}</p>
                </div>
                <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0 whitespace-nowrap"
                    style={{
                        background: dl.urgent ? "#FEF2F2" : "#F0FDF4",
                        color: dl.urgent ? "#DC2626" : GREEN_DARK,
                    }}
                >
                    {dl.label}
                </span>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{job.description}</p>

            {/* Pill tags */}
            <div className="flex flex-wrap items-center gap-1.5">
                {job.education.map((edu) => (
                    <span
                        key={edu}
                        className="text-xs font-bold px-2.5 py-1 rounded-md"
                        style={{ background: GREEN_LIGHT, color: GREEN_DARK }}
                    >
                        {edu}
                    </span>
                ))}
                {job.tags?.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-600">
                        {tag}
                    </span>
                ))}
                <span
                    className="text-xs font-bold px-2.5 py-1 rounded-md text-white ml-auto"
                    style={{ background: GREEN }}
                >
                    {job.vacancies} Posisi
                </span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3.5 border-t border-gray-100">
                <div className="flex gap-5">
                    <div>
                        <p className="text-xs text-gray-400 mb-0.5">Lokasi</p>
                        <p className="text-xs font-semibold text-gray-700">{job.location}</p>
                    </div>
                    {job.duration && (
                        <div>
                            <p className="text-xs text-gray-400 mb-0.5">Durasi</p>
                            <p className="text-xs font-semibold text-gray-700">{job.duration}</p>
                        </div>
                    )}
                </div>
                <button
                    className="text-xs font-bold px-4 py-2 rounded-lg border-none cursor-pointer shrink-0 transition-all duration-150"
                    style={{
                        background: hovered ? GREEN : GREEN_LIGHT,
                        color: hovered ? "white" : GREEN,
                    }}
                    onClick={(e) => { e.stopPropagation(); onClick() }}
                >
                    Detail →
                </button>
            </div>
        </div>
    )
}