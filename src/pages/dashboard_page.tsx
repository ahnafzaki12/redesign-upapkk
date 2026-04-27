import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  Briefcase,
  BookOpen,
  Heart,
  User,
  FileText,
  Mail,
  FolderOpen,
  Star,
  MessageSquare,
  Key,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  Search,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  Building2,
  MapPin,
  Calendar,
} from "lucide-react";
import { currentTheme } from "../theme/theme";
import { useAuth } from "../contexts/AuthContext";

// ─── Static data ──────────────────────────────────────────────────────────────
const STATS = [
  {
    id: "lowongan",
    label: "Total Lowongan",
    value: 125,
    icon: Briefcase,
    color: currentTheme.primary,
    colorBg: currentTheme.surfaceAlt,
    trend: "+12 minggu ini",
  },
  {
    id: "magang",
    label: "Total Magang",
    value: 10,
    icon: BookOpen,
    color: "#16A34A",
    colorBg: "#DCFCE7",
    trend: "+2 bulan ini",
  },
  {
    id: "dilamar",
    label: "Total yang Dilamar",
    value: 7,
    icon: CheckCircle,
    color: "#D97706",
    colorBg: "#FEF3C7",
    trend: "3 menunggu",
  },
];

const RECENT_APPLICATIONS = [
  {
    id: 1,
    position: "Frontend Developer",
    company: "PT. Teknologi Maju",
    location: "Surabaya",
    date: "24 Apr 2026",
    status: "review",
  },
  {
    id: 2,
    position: "UI/UX Designer",
    company: "Startup Kreatif",
    location: "Jakarta",
    date: "20 Apr 2026",
    status: "accepted",
  },
  {
    id: 3,
    position: "Backend Engineer",
    company: "PT. Digital Nusantara",
    location: "Bandung",
    date: "15 Apr 2026",
    status: "rejected",
  },
];

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  review: { label: "Ditinjau", color: "#D97706", bg: "#FEF3C7" },
  accepted: { label: "Diterima", color: "#16A34A", bg: "#DCFCE7" },
  rejected: { label: "Ditolak", color: "#DC2626", bg: "#FEE2E2" },
};

// ─── Sidebar menu data ────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { id: "beranda", label: "Beranda", icon: Home, path: "/dashboard" },
  { id: "lowongan", label: "Lowongan Kerja", icon: Briefcase, path: "/karir/pekerjaan" },
  { id: "magang", label: "Magang", icon: BookOpen, path: "/karir/magang" },
  { id: "wishlist", label: "Whislist", icon: Heart, path: "/dashboard/wishlist" },
];

const ACCOUNT_ITEMS = [
  { id: "cv", label: "Curriculum Vitae", icon: FileText, path: "/dashboard/cv" },
  { id: "applied-vacancy", label: "Applied Vacancy", icon: Briefcase, path: "/dashboard/applied-vacancy" },
  { id: "applied-internship", label: "Applied Internship", icon: BookOpen, path: "/dashboard/applied-internship" },
  { id: "cover-letter", label: "Cover Letter", icon: Mail, path: "/dashboard/cover-letter" },
  { id: "file-manager", label: "File Manager", icon: FolderOpen, path: "/dashboard/files" },
  { id: "talent", label: "Talent (Minat Bakat)", icon: Star, path: "/dashboard/talent" },
  { id: "counseling", label: "Career Counseling", icon: MessageSquare, path: "/dashboard/counseling" },
  { id: "profile", label: "Profile", icon: User, path: "/dashboard/profile" },
  { id: "password", label: "Change Password", icon: Key, path: "/dashboard/password" },
];

// ─── Avatar component ─────────────────────────────────────────────────────────
function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
  return (
    <div
      className="flex items-center justify-center rounded-full font-bold text-white shrink-0"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.35,
        background: `linear-gradient(135deg, ${currentTheme.heroStart}, ${currentTheme.heroEnd})`,
      }}
    >
      {initials}
    </div>
  );
}

// ─── Sidebar content ──────────────────────────────────────────────────────────
interface SidebarContentProps {
  active: string;
  onNavigate: (id: string) => void;
  onLogout: () => void;
  onClose?: () => void;
  userName: string;
  userNim: string;
}

function SidebarContent({ active, onNavigate, onLogout, onClose, userName, userNim }: SidebarContentProps) {
  const handleClick = (id: string) => {
    onNavigate(id);
    onClose?.();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <Link to="/" className="flex items-center gap-3" onClick={onClose}>
          <img
            src="/logo_upnvjt.png"
            alt="Logo UPN"
            className="w-10 h-10 object-contain shrink-0"
          />
          <div>
            <p className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">UPA PKK</p>
            <p className="text-sm font-extrabold text-white leading-tight">UPN Veteran Jawa Timur</p>
          </div>
        </Link>
      </div>

      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
          Menu
        </p>
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-left transition-all duration-200"
              style={{
                background: isActive ? "rgba(255,255,255,0.18)" : "transparent",
                color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <Icon size={17} />
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && <ChevronRight size={14} className="ml-auto" />}
            </button>
          );
        })}

        <p className="px-3 mt-5 mb-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
          Account Settings
        </p>
        {ACCOUNT_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-left transition-all duration-200"
              style={{
                background: isActive ? "rgba(255,255,255,0.18)" : "transparent",
                color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <Icon size={17} />
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && <ChevronRight size={14} className="ml-auto" />}
            </button>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="flex items-center gap-3 mb-3">
          <Avatar name={userName} size={36} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{userName.split(" ")[0]}</p>
            <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>{userNim}</p>
          </div>
        </div>
        <button
          id="dashboard-logout-btn"
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200"
          style={{ color: "rgba(255,255,255,0.6)", background: "rgba(239,68,68,0.08)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; e.currentTarget.style.color = "#FCA5A5"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
        >
          <LogOut size={15} />
          Keluar
        </button>
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────────
const DashboardPage = () => {
  const [activeMenu, setActiveMenu] = useState("beranda");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Fallback if somehow accessed without auth (shouldn't happen with protected routes)
  const displayName = user?.name ?? "Pengguna";
  const displayNickname = user?.nickname ?? "Pengguna";
  const displayNim = user?.nim ?? "-";
  const displayProdi = user?.prodi ?? "-";
  const displayAccountType = user?.accountType ?? "-";

  const handleNavigate = (id: string) => {
    setActiveMenu(id);
    const all = [...MENU_ITEMS, ...ACCOUNT_ITEMS];
    const item = all.find((m) => m.id === id);
    if (item && !item.path.includes("#")) navigate(item.path);
  };

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#F1F5F9" }}>
      {/* ── Desktop Sidebar ─────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex lg:flex-col w-64 shrink-0 fixed top-0 left-0 h-screen z-30"
        style={{
          background: `linear-gradient(170deg, ${currentTheme.heroStart} 0%, ${currentTheme.primary} 50%, ${currentTheme.heroEnd} 100%)`,
          boxShadow: "4px 0 24px rgba(47,143,143,0.15)",
        }}
      >
        <SidebarContent
          active={activeMenu}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          userName={displayName}
          userNim={displayNim}
        />
      </aside>

      {/* ── Mobile Sidebar Overlay ──────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.45)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className="fixed top-0 left-0 h-screen w-64 z-50 lg:hidden flex flex-col transition-transform duration-300"
        style={{
          background: `linear-gradient(170deg, ${currentTheme.heroStart} 0%, ${currentTheme.primary} 50%, ${currentTheme.heroEnd} 100%)`,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          boxShadow: "4px 0 24px rgba(47,143,143,0.2)",
        }}
      >
        <button
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full"
          style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
          onClick={() => setSidebarOpen(false)}
        >
          <X size={16} />
        </button>
        <SidebarContent
          active={activeMenu}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onClose={() => setSidebarOpen(false)}
          userName={displayName}
          userNim={displayNim}
        />
      </aside>

      {/* ── Main content ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col lg:ml-64 min-w-0">
        {/* Topbar */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5"
          style={{ background: "#fff", boxShadow: "0 1px 0 #E2E8F0" }}
        >
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={18} color="#374151" />
            </button>
            <div className="hidden sm:flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 w-56 xl:w-72">
              <Search size={15} color="#9CA3AF" />
              <input
                type="text"
                placeholder="Cari lowongan, magang…"
                className="bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
              aria-label="Notifikasi"
            >
              <Bell size={17} color="#374151" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full border-2 border-white" style={{ background: "#EF4444" }} />
            </button>
            <div className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5">
              <Avatar name={displayName} size={28} />
              <div className="hidden md:block">
                <p className="text-xs font-semibold text-gray-800 leading-tight max-w-[140px] truncate">{displayName}</p>
                <p className="text-[10px]" style={{ color: currentTheme.primary }}>{displayAccountType}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 px-4 sm:px-6 py-6 space-y-6">

          {/* ── Welcome banner ── */}
          <div
            className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.heroStart} 0%, ${currentTheme.primary} 55%, ${currentTheme.heroEnd} 100%)`,
            }}
          >
            <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full opacity-20 blur-2xl" style={{ background: "#fff" }} />
            <div className="pointer-events-none absolute bottom-0 right-24 h-32 w-32 rounded-full opacity-10 blur-xl" style={{ background: "#B9E2E2" }} />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-white/70 text-sm font-medium mb-1">Selamat datang kembali 👋</p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Hi, {displayNickname}!
                </h1>
                <p className="mt-1 text-white/60 text-sm">{displayProdi} · {displayAccountType}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link
                  to="/karir/pekerjaan"
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white border border-white/30 hover:bg-white/15 transition-colors"
                >
                  <Briefcase size={15} />
                  Cari Lowongan
                </Link>
                <Link
                  to="/dashboard/cv"
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold bg-white hover:bg-gray-50 transition-colors"
                  style={{ color: currentTheme.primary }}
                >
                  <FileText size={15} />
                  Update CV
                </Link>
              </div>
            </div>
          </div>

          {/* ── Stats cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="bg-white rounded-2xl p-5 flex items-start justify-between transition-shadow hover:shadow-md"
                  style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                >
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
                    <p className="text-4xl font-extrabold" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="mt-2 flex items-center gap-1 text-xs font-medium" style={{ color: stat.color }}>
                      <TrendingUp size={12} />
                      {stat.trend}
                    </p>
                  </div>
                  <div
                    className="flex items-center justify-center rounded-xl"
                    style={{ background: stat.colorBg, width: 44, height: 44 }}
                  >
                    <Icon size={20} color={stat.color} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Bottom grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Recent applications */}
            <div
              className="lg:col-span-2 bg-white rounded-2xl p-5"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-800">Lamaran Terkini</h2>
                <button
                  className="text-xs font-semibold flex items-center gap-1 hover:underline"
                  style={{ color: currentTheme.primary }}
                  onClick={() => handleNavigate("applied-vacancy")}
                >
                  Lihat semua <ArrowUpRight size={13} />
                </button>
              </div>

              <div className="space-y-3">
                {RECENT_APPLICATIONS.map((app) => {
                  const s = STATUS_MAP[app.status];
                  return (
                    <div
                      key={app.id}
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all cursor-pointer"
                    >
                      <div
                        className="flex items-center justify-center rounded-xl shrink-0"
                        style={{ width: 42, height: 42, background: currentTheme.surfaceAlt }}
                      >
                        <Building2 size={18} color={currentTheme.primary} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{app.position}</p>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{app.company}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="flex items-center gap-1 text-[11px] text-gray-400">
                            <MapPin size={10} /> {app.location}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-gray-400">
                            <Calendar size={10} /> {app.date}
                          </span>
                        </div>
                      </div>
                      <span
                        className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                        style={{ background: s.bg, color: s.color }}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {RECENT_APPLICATIONS.length === 0 && (
                <div className="text-center py-10">
                  <AlertCircle size={32} color="#D1D5DB" className="mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Belum ada lamaran</p>
                </div>
              )}
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4">
              {/* Profile completion */}
              <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <h2 className="text-sm font-bold text-gray-800 mb-3">Kelengkapan Profil</h2>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-500">65% selesai</span>
                  <span className="text-xs font-semibold" style={{ color: currentTheme.primary }}>65%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: "65%", background: `linear-gradient(90deg, ${currentTheme.heroStart}, ${currentTheme.heroEnd})` }}
                  />
                </div>
                <div className="mt-3 space-y-2">
                  {[
                    { label: "Foto Profil", done: true },
                    { label: "Curriculum Vitae", done: true },
                    { label: "Cover Letter", done: false },
                    { label: "Talent & Minat", done: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div
                        className="flex items-center justify-center rounded-full shrink-0"
                        style={{ width: 18, height: 18, background: item.done ? currentTheme.surfaceAlt : "#F3F4F6" }}
                      >
                        {item.done
                          ? <CheckCircle size={12} color={currentTheme.primary} />
                          : <Clock size={12} color="#9CA3AF" />}
                      </div>
                      <span className="text-xs" style={{ color: item.done ? "#374151" : "#9CA3AF" }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <h2 className="text-sm font-bold text-gray-800 mb-3">Akses Cepat</h2>
                <div className="space-y-1">
                  {[
                    { label: "Upload CV", icon: FileText, id: "cv" },
                    { label: "Buat Cover Letter", icon: Mail, id: "cover-letter" },
                    { label: "Career Counseling", icon: MessageSquare, id: "counseling" },
                    { label: "File Manager", icon: FolderOpen, id: "file-manager" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <div
                          className="flex items-center justify-center rounded-lg shrink-0"
                          style={{ width: 30, height: 30, background: currentTheme.surfaceAlt }}
                        >
                          <Icon size={14} color={currentTheme.primary} />
                        </div>
                        {item.label}
                        <ChevronRight size={14} color="#D1D5DB" className="ml-auto" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-gray-100 text-center text-xs text-gray-400">
          © 2026 UPA PKK — UPN Veteran Jawa Timur. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default DashboardPage;
