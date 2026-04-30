import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LayoutDashboard, LogOut, User, ChevronDown } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type DropdownItem = {
    label: string;
    href: string;
};

type NavItem = {
    label: string;
    href?: string;
    dropdown?: DropdownItem[];
};

// ─── Nav data ─────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
    { label: "Beranda", href: "/" },
    {
        label: "Karir",
        dropdown: [
            { label: "Lowongan Pekerjaan", href: "/karir/pekerjaan" },
            { label: "Lowongan Magang", href: "/karir/magang" },
            { label: "Perusahaan", href: "/karir/perusahaan" },
            { label: "Acara", href: "/karir/acara" },
            { label: "CV Builder", href: "/karir/cv-builder" },
            { label: "Virtual Career Expo", href: "https://upnjatim.dashboard.kinobi.asia/login?message=Unauthorized" },
        ],
    },
    { label: "Kewirausahaan", href: "/kewirausahaan" },
    {
        label: "Tracer Study",
        dropdown: [
            { label: "Tracer Study Lulusan", href: "https://tracerstudy.upnjatim.ac.id/" },
            { label: "Kepuasan Pengguna", href: "https://docs.google.com/forms/d/e/1FAIpQLSe7z79tbm8xUmRAkmGmEQmPnc24r9zmLrXT-DgXVytRSY8uTQ/viewform" },
        ],
    },
    { label: "Artikel", href: "/artikel" },
    {
        label: "Bantuan",
        dropdown: [
            { label: "Tentang", href: "/tentang" },
            { label: "FAQ", href: "/faq" },
            { label: "Kontak", href: "/kontak" },
        ],
    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
const ChevronIcon = ({ open }: { open: boolean }) => (
    <svg
        className={`w-4 h-4 ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const DropdownMenu = ({ items, currentPath }: { items: DropdownItem[]; currentPath: string }) => (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-50 py-1.5">
        {items.map((item) => {
            const isActive = currentPath === item.href;
            const className = `flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 font-medium
                        ${isActive ? "text-(--pg-primary)" : "text-gray-600 hover:text-(--pg-primary)"}`;
            
            if (item.href.startsWith("http")) {
                return (
                    <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                    >
                        {item.label}
                    </a>
                );
            }

            return (
                <Link
                    key={item.href}
                    to={item.href}
                    className={className}
                >
                    {item.label}
                </Link>
            );
        })}
    </div>
);

const NavLink = ({ item }: { item: NavItem }) => {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const isActive = item.href === location.pathname;
    const isChildActive = item.dropdown?.some((sub) => {
        if (sub.href.startsWith("http")) return false;
        const parentPath = sub.href.split("/")[1];
        return parentPath ? location.pathname.startsWith(`/${parentPath}`) : false;
    });
    const shouldBeHighlighted = isActive || isChildActive;

    const handleOpen = () => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        setOpen(true);
    };
    const handleClose = () => {
        closeTimeoutRef.current = setTimeout(() => setOpen(false), 120);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        };
    }, []);

    if (item.dropdown) {
        return (
            <div ref={ref} className="relative" onMouseEnter={handleOpen} onMouseLeave={handleClose}>
                <button
                    type="button"
                    className={`group relative flex items-center text-sm font-semibold px-4 py-3 transition-colors duration-150
                        ${open || shouldBeHighlighted ? "text-(--pg-primary)" : "text-gray-600 hover:text-(--pg-primary)"}`}
                >
                    {item.label}
                    <ChevronIcon open={open} />
                    <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-(--pg-hero-start) rounded-full transition-all duration-200
                        ${open || shouldBeHighlighted ? "w-4/5" : "w-0 group-hover:w-4/5"}`}
                    />
                </button>
                {open && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                        <DropdownMenu items={item.dropdown} currentPath={location.pathname} />
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            to={item.href || "#"}
            className={`group relative flex items-center text-sm font-semibold px-3 py-2 transition-colors duration-150
                ${isActive ? "text-(--pg-primary)" : "text-gray-600 hover:text-(--pg-primary)"}`}
        >
            {item.label}
            <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-(--pg-hero-start) rounded-full transition-all duration-200
                ${isActive ? "w-3/5" : "w-0 group-hover:w-3/5"}`}
            />
        </Link>
    );
};

const HamburgerIcon = ({ open }: { open: boolean }) => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        )}
    </svg>
);

// ── User avatar dropdown ──────────────────────────────────────────────────────
function UserMenu() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    if (!user) return null;

    const initials = user.name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("");

    const handleLogout = () => {
        if (window.confirm("Apakah Anda yakin ingin keluar?")) {
            logout();
            setOpen(false);
            navigate("/");
        }
    };

    return (
        <div ref={ref} className="relative">
            <button
                id="navbar-user-menu-btn"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 transition-colors"
            >
                <div
                    className="flex items-center justify-center rounded-full text-white text-xs font-bold shrink-0"
                    style={{
                        width: 30,
                        height: 30,
                        background: "linear-gradient(135deg, var(--pg-hero-start), var(--pg-hero-end))",
                    }}
                >
                    {initials}
                </div>
                <div className="hidden md:block text-left">
                    <p className="text-xs font-semibold text-gray-800 leading-tight max-w-30 truncate">
                        {user.nickname}
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--pg-primary)" }}>
                        {user.role === "admin" ? "Administrator" : user.accountType}
                    </p>
                </div>
                <ChevronDown
                    size={13}
                    color="#9CA3AF"
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in-scale">
                    {/* Header */}
                    <div className="px-4 py-2.5 border-b border-gray-100">
                        <p className="text-xs font-bold text-gray-800 truncate">{user.name}</p>
                        <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                    </div>
                    {/* Links */}
                    <div className="py-1.5">
                        <Link
                            to={user.role === "admin" ? "/admin" : "/dashboard"}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-(--pg-primary) transition-colors"
                        >
                            <LayoutDashboard size={15} />
                            Dashboard
                        </Link>
                        <Link
                            to="/dashboard/profile"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-(--pg-primary) transition-colors"
                        >
                            <User size={15} />
                            Profil Saya
                        </Link>
                    </div>
                    {/* Logout */}
                    <div className="border-t border-gray-100 pt-1.5 pb-1">
                        <button
                            id="navbar-logout-btn"
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                            <LogOut size={15} />
                            Keluar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
    const location = useLocation();
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleMobileLogout = () => {
        if (window.confirm("Apakah Anda yakin ingin keluar?")) {
            logout();
            setMobileOpen(false);
            navigate("/");
        }
    };

    return (
        <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto h-24 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link to="/" className="flex items-center shrink-0">
                    <img
                        src="/logo.png"
                        alt="UPA PKK UPN Veteran Jawa Timur"
                        className="h-28 w-auto object-contain"
                    />
                </Link>

                {/* Desktop nav links */}
                <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
                    {NAV_ITEMS.map((item) => (
                        <NavLink key={item.label} item={item} />
                    ))}
                </div>

                {/* Desktop auth area */}
                <div className="hidden lg:flex items-center gap-3 shrink-0">
                    {isAuthenticated ? (
                        <UserMenu />
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-sm font-semibold px-4 py-2 rounded-lg text-(--pg-primary) border border-[rgba(var(--pg-hero-start-rgb),0.4)] hover:bg-[rgba(var(--pg-hero-start-rgb),0.1)] transition-all duration-150"
                            >
                                Masuk
                            </Link>
                            <Link
                                to="/registrasi"
                                className="text-sm font-semibold px-4 py-2 rounded-lg bg-(--pg-hero-start) text-white hover:bg-(--pg-primary-hover) active:scale-95 transition-all duration-150 shadow-sm"
                            >
                                Registrasi
                            </Link>
                        </>
                    )}
                </div>

                {/* Hamburger */}
                <button
                    onClick={() => setMobileOpen((prev) => !prev)}
                    className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    aria-label="Toggle menu"
                >
                    <HamburgerIcon open={mobileOpen} />
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-0.5">
                    {NAV_ITEMS.map((item) => {
                        const isActive = item.href === location.pathname;
                        // Only highlight if any sub-menu (internal link) matches exactly
                        const isChildActive = item.dropdown?.some((sub) => {
                            if (sub.href.startsWith("http")) return false;
                            return location.pathname === sub.href;
                        });

                        if (item.dropdown) {
                            return (
                                <div key={item.label}>
                                    <button
                                        onClick={() =>
                                            setMobileExpanded((prev) =>
                                                prev === item.label ? null : item.label
                                            )
                                        }
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors
                                            ${isChildActive
                                                ? "text-(--pg-primary) bg-[rgba(var(--pg-hero-start-rgb),0.1)]"
                                                : "text-gray-700 hover:bg-[rgba(var(--pg-hero-start-rgb),0.1)]"
                                            }`}
                                    >
                                        {item.label}
                                        <ChevronIcon open={mobileExpanded === item.label} />
                                    </button>
                                    {mobileExpanded === item.label && (
                                        <div className="ml-3 mt-0.5 border-l-2 border-[rgba(var(--pg-hero-start-rgb),0.35)] pl-3 space-y-0.5">
                                            {item.dropdown.map((sub) => (
                                                <Link
                                                    key={sub.href}
                                                    to={sub.href}
                                                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors
                                                        ${location.pathname === sub.href
                                                            ? "text-(--pg-primary)"
                                                            : "text-gray-500 hover:text-(--pg-primary)"
                                                        }`}
                                                    onClick={() => setMobileOpen(false)}
                                                >
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.label}
                                to={item.href || "#"}
                                className={`block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors
                                    ${isActive
                                        ? "text-(--pg-primary) bg-[rgba(var(--pg-hero-start-rgb),0.1)]"
                                        : "text-gray-700 hover:bg-[rgba(var(--pg-hero-start-rgb),0.1)]"
                                    }`}
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    {/* Mobile auth section */}
                    <div className="pt-3 pb-1 border-t border-gray-100 mt-2">
                        {isAuthenticated && user ? (
                            <div className="space-y-1">
                                {/* User chip */}
                                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50">
                                    <div
                                        className="flex items-center justify-center rounded-full text-white text-xs font-bold shrink-0"
                                        style={{
                                            width: 34,
                                            height: 34,
                                            background:
                                                "linear-gradient(135deg, var(--pg-hero-start), var(--pg-hero-end))",
                                        }}
                                    >
                                        {user.name
                                            .split(" ")
                                            .slice(0, 2)
                                            .map((n) => n[0])
                                            .join("")}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{user.nickname}</p>
                                        <p className="text-xs text-gray-400">{user.email}</p>
                                    </div>
                                </div>
                                <Link
                                    to={user.role === "admin" ? "/admin" : "/dashboard"}
                                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <LayoutDashboard size={16} />
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleMobileLogout}
                                    className="flex w-full items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut size={16} />
                                    Keluar
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link
                                    to="/login"
                                    className="text-center text-sm font-semibold px-4 py-2.5 rounded-lg text-(--pg-primary) border border-[rgba(var(--pg-hero-start-rgb),0.4)] hover:bg-[rgba(var(--pg-hero-start-rgb),0.1)] transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Masuk
                                </Link>
                                <Link
                                    to="/registrasi"
                                    className="text-center text-sm font-semibold px-4 py-2.5 rounded-lg bg-(--pg-hero-start) text-white hover:bg-(--pg-primary-hover) transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Registrasi
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;