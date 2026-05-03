import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Home,
  Briefcase,
  BookOpen,
  Heart,
  User,
  FileText,
  FolderOpen,
  Key,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Building2,
  MapPin,
  Calendar,
} from "lucide-react";
import { currentTheme } from "../theme/theme";
import { useAuth } from "../contexts/AuthContext";
import WishlistPage from "./dashboard/wishlist_page";
import KewirausahaanDiikutiPage from "./dashboard/kewirausahaan_diikuti_page";
import ProfilePage from "./dashboard/profile_page";
import FileManagerPage from "./dashboard/file_manager_page";
import { kewirausahaanData } from "../data/kewirausahaanData";

// ─── Static data ──────────────────────────────────────────────────────────────
const RECENT_KEWIRAUSAHAAN = [
  {
    id: 1,
    program: "Program Mahasiswa Wirausaha (PMW) 2026",
    role: "Ketua Tim",
    date: "24 Apr 2026",
    status: "review",
  },
  {
    id: 2,
    program: "Kompetisi Bisnis Mahasiswa Indonesia",
    role: "Anggota",
    date: "10 Mar 2026",
    status: "accepted",
  },
];

const STATS = [
  {
    id: "kewirausahaan",
    label: "Program Kewirausahaan",
    value: kewirausahaanData.length,
    icon: Briefcase,
    color: currentTheme.primary,
    colorBg: currentTheme.surfaceAlt,
    trend: "Tersedia saat ini",
  },
  {
    id: "diikuti",
    label: "Program Diikuti",
    value: RECENT_KEWIRAUSAHAAN.length,
    icon: BookOpen,
    color: "#16A34A",
    colorBg: "#DCFCE7",
    trend: "Sedang berjalan",
  },
  {
    id: "files",
    label: "Total File",
    value: 2,
    icon: FileText,
    color: "#D97706",
    colorBg: "#FEF3C7",
    trend: "Tersimpan",
  },
];

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  review: { label: "Seleksi", color: "#D97706", bg: "#FEF3C7" },
  accepted: { label: "Aktif", color: "#16A34A", bg: "#DCFCE7" },
  rejected: { label: "Selesai/Ditolak", color: "#DC2626", bg: "#FEE2E2" },
};

// ─── Sidebar menu data ────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { id: "beranda", label: "Beranda", icon: Home, path: "/dashboard" },
  { id: "kewirausahaan", label: "Kewirausahaan", icon: Briefcase, path: "/kewirausahaan" },
  { id: "kewirausahaan-diikuti", label: "Kewirausahaan di ikuti", icon: BookOpen, path: "/dashboard/kewirausahaan-diikuti" },
  { id: "wishlist", label: "Whislist", icon: Heart, path: "/dashboard/wishlist" },
];

const ACCOUNT_ITEMS = [
  { id: "cv", label: "Curriculum Vitae", icon: FileText, path: "/dashboard/cv" },
  { id: "files", label: "File Manager", icon: FolderOpen, path: "/dashboard/files" },
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
        background: `linear-gradient(120deg, ${currentTheme.heroStart} 0%, ${currentTheme.primary} 85%)`,
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

function SidebarContent({ active, onNavigate, onLogout, onClose }: SidebarContentProps) {
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
        <button
          id="dashboard-logout-btn"
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border shadow-sm"
          style={{
            color: "#B42318",
            background: "#FFF5F5",
            borderColor: "#F2CACA",
            boxShadow: "0 6px 16px rgba(220,38,38,0.10)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FBDADA";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#FFF5F5";
          }}
        >
          <LogOut size={15} color="#DC2626" />
          Keluar
        </button>
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────────
const DashboardPage = () => {
  const { section } = useParams<{ section?: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const activeMenu = section || "beranda";

  // Fallback if somehow accessed without auth (shouldn't happen with protected routes)
  const displayName = user?.name ?? "Pengguna";
  const displayNickname = user?.nickname ?? "Pengguna";
  const displayNim = user?.nim ?? "-";
  const displayProdi = user?.prodi ?? "-";
  const displayAccountType = user?.accountType ?? "-";

  const handleNavigate = (id: string) => {
    const all = [...MENU_ITEMS, ...ACCOUNT_ITEMS];
    const item = all.find((m) => m.id === id);
    if (item && !item.path.includes("#")) {
      navigate(item.path);
    } else {
      navigate(`/dashboard/${id}`);
    }
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
          background: `linear-gradient(170deg, ${currentTheme.heroStart} 0%, ${currentTheme.primary} 85%)`,
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
          background: `linear-gradient(170deg, ${currentTheme.heroStart} 0%, ${currentTheme.primary} 85%)`,
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
                <p className="text-xs font-semibold text-gray-800 leading-tight max-w-35 truncate">{displayName}</p>
                <p className="text-[10px]" style={{ color: currentTheme.primary }}>{displayAccountType}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 px-4 sm:px-6 py-6 space-y-6">
          {section === "kewirausahaan-diikuti" && <KewirausahaanDiikutiPage />}
          {section === "wishlist" && <WishlistPage />}
          {section === "profile" && <ProfilePage />}
          {section === "files" && <FileManagerPage />}

          {(!section || section === "beranda") && (
            <>
              {/* ── Welcome banner ── */}
              <div
                className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
                style={{
                  background: `linear-gradient(120deg, ${currentTheme.heroStart} 0%, ${currentTheme.primary} 85%)`,
                }}
              >
                <div className="pointer-events-none absolute -top-10 -right-10 h-[250px] w-[250px] rounded-full opacity-30 blur-[40px]" style={{ background: "#fff" }} />
                <div className="pointer-events-none absolute bottom-0 right-24 h-48 w-48 rounded-full opacity-20 blur-[30px]" style={{ background: "#B9E2E2" }} />

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

                {/* Recent kewirausahaan */}
                <div
                  className="lg:col-span-2 bg-white rounded-2xl p-5"
                  style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-gray-800">Kewirausahaan yang Diikuti</h2>
                  </div>

                  <div className="space-y-3">
                    {RECENT_KEWIRAUSAHAAN.map((item) => {
                      const s = STATUS_MAP[item.status];
                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all cursor-pointer"
                        >
                          <div
                            className="flex items-center justify-center rounded-xl shrink-0"
                            style={{ width: 42, height: 42, background: currentTheme.surfaceAlt }}
                          >
                            <BookOpen size={18} color={currentTheme.primary} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">{item.program}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                                <User size={10} /> {item.role}
                              </span>
                              <span className="flex items-center gap-1 text-[11px] text-gray-400">
                                <Calendar size={10} /> {item.date}
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

                  {RECENT_KEWIRAUSAHAAN.length === 0 && (
                    <div className="text-center py-10">
                      <AlertCircle size={32} color="#D1D5DB" className="mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Belum ada program yang diikuti</p>
                    </div>
                  )}
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-4">
                  {/* Quick links */}
                  <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                    <h2 className="text-sm font-bold text-gray-800 mb-3">Akses Cepat</h2>
                    <div className="space-y-1">
                      {[
                        { label: "Upload CV", icon: FileText, id: "cv" },
                        { label: "File Manager", icon: FolderOpen, id: "files" },
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
            </>
          )}
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
