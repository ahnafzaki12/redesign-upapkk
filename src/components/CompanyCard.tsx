import { useState } from "react";
import type { Company } from "../types/types";
import { currentTheme } from "../theme/theme";

const ACCENT = currentTheme.primary;
const ACCENT_LIGHT = currentTheme.surfaceAlt;

const PACKAGE_CONFIG = {
  Gold: { bg: "#FEF9C3", color: "#854D0E", border: "#FDE047", label: "Gold Partner" },
  Silver: { bg: "#F1F5F9", color: "#475569", border: "#CBD5E1", label: "Silver Partner" },
  Bronze: { bg: "#FEF3C7", color: "#92400E", border: "#FCD34D", label: "Bronze Partner" },
};

interface CompanyCardProps {
  company: Company;
  jobCount: number;
  onClick: () => void;
}

export default function CompanyCard({ company, jobCount, onClick }: CompanyCardProps) {
  const [hovered, setHovered] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const pkg = PACKAGE_CONFIG[company.package];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-xl p-5 flex flex-col gap-4 cursor-pointer"
      style={{
        border: hovered ? `1.5px solid ${ACCENT}` : "1.5px solid #F0F0F0",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.10)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3.5">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 overflow-hidden bg-white shadow-sm border border-gray-100">
          {company.logoUrl && !logoFailed ? (
            <img
              src={company.logoUrl}
              alt={company.name}
              className="w-full h-full object-contain p-1"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white text-xs font-black"
              style={{ background: company.logoColor }}
            >
              {company.logo}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900 truncate">{company.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{company.industry}</p>
        </div>

        {/* Package badge */}
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0 border"
          style={{ background: pkg.bg, color: pkg.color, borderColor: pkg.border }}
        >
          {pkg.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{company.description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex gap-4">
          <div>
            <p className="text-xs text-gray-400">Lokasi</p>
            <p className="text-xs font-semibold text-gray-700">{company.location}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Lowongan</p>
            <p className="text-xs font-semibold" style={{ color: ACCENT }}>{jobCount} tersedia</p>
          </div>
        </div>
        <button
          className="text-xs font-bold px-4 py-2 rounded-md border-none cursor-pointer shrink-0 transition-all duration-150"
          style={{
            background: hovered ? ACCENT : ACCENT_LIGHT,
            color: hovered ? "white" : ACCENT,
          }}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
          Lihat →
        </button>
      </div>
    </div>
  );
}