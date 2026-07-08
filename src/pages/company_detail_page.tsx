import { useParams, useNavigate } from "react-router-dom";
import { companiesData } from "../data/companyData";
import { jobsData } from "../data/jobData";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import JobCard from "../components/JobCard";
import { currentTheme } from "../theme/theme";

const ACCENT = currentTheme.primary;
const ACCENT_DARK = currentTheme.heroEnd;
const HERO_BG = currentTheme.heroEnd;

const PACKAGE_CONFIG = {
    Gold: { bg: "#FEF9C3", color: "#854D0E", border: "#FDE047", label: "Gold Partner" },
    Silver: { bg: "#F1F5F9", color: "#475569", border: "#CBD5E1", label: "Silver Partner" },
    Bronze: { bg: "#FEF3C7", color: "#92400E", border: "#FCD34D", label: "Bronze Partner" },
};

export default function CompanyDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const company = companiesData.find((c) => c.id === Number(id));

    if (!company) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl font-bold text-gray-700 mb-4">Perusahaan tidak ditemukan</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-white border-none cursor-pointer"
                        style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}
                    >
                        Kembali
                    </button>
                </div>
            </div>
        );
    }

    const companyJobs = jobsData.filter((j) => j.companyId === company.id);
    const pkg = PACKAGE_CONFIG[company.package];

    const breadcrumbs = [
        { label: "Beranda", path: "/" },
        { label: "Perusahaan", path: "/karir/perusahaan" },
    ];

    const metaChips: string[] = [
        company.industry,
        company.location,
        ...(company.founded ? [`Est. ${company.founded}`] : []),
        ...(company.employeeCount ? [`${company.employeeCount} karyawan`] : []),
    ];

    const tiers = ["Bronze", "Silver", "Gold"] as const;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* ── HERO ─────────────────────────────────────────────────────────── */}
            <section className="px-4 sm:px-6 pt-14 pb-20" style={{ background: HERO_BG }}>
                <div className="max-w-6xl mx-auto">

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 mb-8">
                        {breadcrumbs.map((crumb) => (
                            <span key={crumb.path} className="flex items-center gap-1.5">
                                <button
                                    onClick={() => navigate(crumb.path)}
                                    className="text-xs font-semibold border-none bg-transparent cursor-pointer"
                                    style={{ color: "rgba(255,255,255,0.6)" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                                >
                                    {crumb.label}
                                </button>
                                <svg
                                    width="12"
                                    height="12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    style={{ color: "rgba(255,255,255,0.4)" }}
                                >
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </span>
                        ))}
                        <span
                            className="text-xs font-semibold truncate max-w-50"
                            style={{ color: "rgba(255,255,255,0.9)" }}
                        >
                            {company.name}
                        </span>
                    </nav>

                    {/* Title row */}
                    <div className="flex flex-wrap items-end gap-5">
                        <div className="flex items-start gap-4">

                            {/* Logo */}
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shadow-md border border-white/20 flex items-center justify-center shrink-0">
                                {company.logoUrl ? (
                                    <img
                                        src={company.logoUrl}
                                        alt={company.name}
                                        className="w-full h-full object-contain p-1"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
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

                            <div>
                                <span
                                    className="inline-block text-xs font-bold px-2.5 py-1 rounded-full border mb-2"
                                    style={{ background: pkg.bg, color: pkg.color, borderColor: pkg.border }}
                                >
                                    {pkg.label}
                                </span>
                                <h1 className="text-3xl sm:text-4xl font-bold text-white">{company.name}</h1>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {metaChips.map((chip) => (
                                        <span
                                            key={chip}
                                            className="px-3 py-1 rounded-lg text-xs font-semibold"
                                            style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}
                                        >
                                            {chip}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24" style={{ marginTop: -32 }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* ── Left: Jobs list ── */}
                    <div className="md:col-span-2 flex flex-col gap-5">
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <h2 className="text-sm font-bold text-gray-800 mb-1 uppercase tracking-wide">
                                Lowongan Tersedia
                            </h2>
                            <p className="text-xs text-gray-400 mb-4">{companyJobs.length} posisi aktif</p>

                            {companyJobs.length === 0 ? (
                                <p className="text-sm text-gray-400 py-8 text-center">
                                    Belum ada lowongan aktif saat ini.
                                </p>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {companyJobs.map((job) => (
                                        <JobCard
                                            key={job.id}
                                            job={job}
                                            onClick={() => navigate(`/karir/detail/${job.id}`)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Right: Sidebar ── */}
                    <div className="flex flex-col gap-4">

                        {/* About */}
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <h2 className="text-sm font-extrabold text-gray-800 mb-4 uppercase tracking-wide">
                                Tentang Perusahaan
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">{company.description}</p>

                            {company.website != null && company.website !== "" && (
                                <a
                                    href={company.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs font-bold no-underline"
                                    style={{ color: ACCENT }}
                                >
                                    {company.website.replace("https://", "")}
                                </a>
                            )}
                        </div>

                        {/* Package info */}
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <h2 className="text-sm font-extrabold text-gray-800 mb-4 uppercase tracking-wide">
                                Paket Kemitraan
                            </h2>
                            <div className="flex flex-col gap-3">
                                {tiers.map((tier) => {
                                    const cfg = PACKAGE_CONFIG[tier];
                                    const isActive = company.package === tier;
                                    return (
                                        <div
                                            key={tier}
                                            className="flex items-center gap-3 p-3 rounded-lg border"
                                            style={{
                                                background: isActive ? cfg.bg : "#F9FAFB",
                                                borderColor: isActive ? cfg.border : "#E5E7EB",
                                            }}
                                        >
                                            <span className="text-base">
                                                {tier === "Gold" ? "🥇" : tier === "Silver" ? "🥈" : "🥉"}
                                            </span>
                                            <div className="flex-1">
                                                <p
                                                    className="text-xs font-bold"
                                                    style={{ color: isActive ? cfg.color : "#9CA3AF" }}
                                                >
                                                    {tier} Partner
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {tier === "Gold"
                                                        ? "Slot lowongan tak terbatas · Featured"
                                                        : tier === "Silver"
                                                            ? "Hingga 5 lowongan · Prioritas"
                                                            : "Hingga 2 lowongan · Standar"}
                                                </p>
                                            </div>
                                            {isActive && (
                                                <span
                                                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                                                    style={{ background: cfg.color, color: "white" }}
                                                >
                                                    Aktif
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Info summary */}
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <h2 className="text-sm font-extrabold text-gray-800 mb-4 uppercase tracking-wide">
                                Informasi Perusahaan
                            </h2>
                            <div className="flex flex-col divide-y divide-gray-50">
                                {([
                                    { label: "Industri", value: company.industry },
                                    { label: "Lokasi", value: company.location },
                                    ...(company.founded
                                        ? [{ label: "Didirikan", value: company.founded }]
                                        : []),
                                    ...(company.employeeCount
                                        ? [{ label: "Jumlah Karyawan", value: company.employeeCount }]
                                        : []),
                                    { label: "Paket", value: `${company.package} Partner` },
                                    { label: "Lowongan Aktif", value: `${companyJobs.length} posisi` },
                                ] as { label: string; value: string }[]).map(({ label, value }) => (
                                    <div key={label} className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0">
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                            {label}
                                        </span>
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