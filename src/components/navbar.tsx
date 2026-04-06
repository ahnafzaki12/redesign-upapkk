import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

type DropdownItem = {
    label: string;
    href: string;
};

type NavItem = {
    label: string;
    href?: string;
    dropdown?: DropdownItem[];
};

const NAV_ITEMS: NavItem[] = [
    { label: "Beranda", href: "/" },
    {
        label: "Karir",
        dropdown: [
            { label: "Lowongan Pekerjaan", href: "/karir/pekerjaan" },
            { label: "Lowongan Magang", href: "/karir/magang" },
            { label: "Acara", href: "/karir/acara" },
            { label: "CV Builder", href: "/karir/cv-builder" },
            { label: "Virtual Career Expo", href: "/karir/expo" },
        ],
    },
    { label: "Kewirausahaan", href: "/kewirausahaan" },
    {
        label: "Tracer Study",
        dropdown: [
            { label: "Tracer Study Lulusan", href: "/tracer-study/lulusan" },
            { label: "Kepuasan Pengguna", href: "/tracer-study/kepuasan" },
        ],
    },
    { label: "Artikel", href: "/artikel" },

    {
        label: "Bantuan",
        dropdown: [
            { label: "Tentang", href: "/tentang" },
            { label: "FAQ", href: "/faq" },
            { label: "Kontak", href: "/kontak" },
            { label: "Peta Kampus", href: "/peta-kampus" },
        ],
    },
];

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

const DropdownMenu = ({ items, currentPath }: { items: DropdownItem[], currentPath: string }) => (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-50 py-1.5">
        {items.map((item) => {
            const isActive = currentPath === item.href;
            return (
                <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 font-medium 
                        ${isActive
                            ? "text-[#00A63E]" // Hanya teks hijau jika aktif
                            : "text-gray-600 hover:text-[#00A63E]" // Hover tetap teks hijau
                        }`}
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
    const isChildActive = item.dropdown?.some(sub => {
        // Kita ambil bagian pertama dari path, misal "/karir"
        const parentPath = sub.href.split('/')[1];
        return location.pathname.startsWith(`/${parentPath}`);
    });
    const shouldBeHighlighted = isActive || isChildActive;

    const handleOpen = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setOpen(true);
    };

    const handleClose = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setOpen(false);
        }, 120);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    if (item.dropdown) {
        return (
            <div
                ref={ref}
                className="relative"
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
            >
                <button
                    type="button"
                    className={`group relative flex items-center text-sm font-semibold px-4 py-3 transition-colors duration-150 
                    ${open || shouldBeHighlighted ? "text-[#00A63E]" : "text-gray-600 hover:text-[#00A63E]"}`}
                >
                    {item.label}
                    <ChevronIcon open={open} />
                    <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#00A63E] rounded-full transition-all duration-200 
                        ${open || shouldBeHighlighted ? "w-4/5" : "w-0 group-hover:w-4/5"}`}
                    />
                </button>

                {open && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                        {/* Kirim location.pathname ke sini */}
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
                ${isActive ? "text-[#00A63E]" : "text-gray-600 hover:text-[#00A63E]"}`}
        >
            {item.label}
            <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#00A63E] rounded-full transition-all duration-200 
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

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
    const location = useLocation();

    return (
        <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto h-24 flex items-center justify-between gap-4">
                <Link to="/" className="flex items-center shrink-0">
                    <img
                        src="/logo.png"
                        alt="UPA PKK UPN Veteran Jawa Timur"
                        className="h-28 w-auto object-contain"
                    />
                </Link>

                <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
                    {NAV_ITEMS.map((item) => (
                        <NavLink key={item.label} item={item} />
                    ))}
                </div>

                <div className="hidden lg:flex items-center gap-4 shrink-0">
                    <Link
                        to="/masuk"
                        className="text-sm font-semibold px-4 py-2 rounded-lg text-[#00A63E] border border-[#00A63E]/30 hover:bg-[#00A63E]/5 transition-all duration-150"
                    >
                        Masuk
                    </Link>
                    <Link
                        to="/registrasi"
                        className="text-sm font-semibold px-4 py-2 rounded-lg bg-[#00A63E] text-white hover:bg-[#009935] active:scale-95 transition-all duration-150 shadow-sm"
                    >
                        Registrasi
                    </Link>
                </div>

                <button
                    onClick={() => setMobileOpen((prev) => !prev)}
                    className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    aria-label="Toggle menu"
                >
                    <HamburgerIcon open={mobileOpen} />
                </button>
            </div>

            {mobileOpen && (
                <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-0.5">
                    {NAV_ITEMS.map((item) => {
                        const isActive = item.href === location.pathname;
                        const isChildActive = item.dropdown?.some(sub => {
                            const parentPath = sub.href.split('/')[1];
                            return location.pathname.startsWith(`/${parentPath}`);
                        });

                        if (item.dropdown) {
                            return (
                                <div key={item.label}>
                                    <button
                                        onClick={() => setMobileExpanded((prev) => (prev === item.label ? null : item.label))}
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors
                                            ${isChildActive ? "text-[#00A63E] bg-[#00A63E]/5" : "text-gray-700 hover:bg-[#00A63E]/5"}`}
                                    >
                                        {item.label}
                                        <ChevronIcon open={mobileExpanded === item.label} />
                                    </button>
                                    {mobileExpanded === item.label && (
                                        <div className="ml-3 mt-0.5 border-l-2 border-[#00A63E]/20 pl-3 space-y-0.5">
                                            {item.dropdown.map((sub) => (
                                                <Link
                                                    key={sub.href}
                                                    to={sub.href}
                                                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors
                                                        ${location.pathname === sub.href ? "text-[#00A63E]" : "text-gray-500 hover:text-[#00A63E]"}`}
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
                                    ${isActive ? "text-[#00A63E] bg-[#00A63E]/5" : "text-gray-700 hover:bg-[#00A63E]/5"}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    <div className="pt-3 pb-1 flex flex-col gap-2 border-t border-gray-100 mt-2">
                        <Link
                            to="/masuk"
                            className="text-center text-sm font-semibold px-4 py-2.5 rounded-lg text-[#00A63E] border border-[#00A63E]/30 hover:bg-[#00A63E]/5 transition-colors"
                            onClick={() => setMobileOpen(false)}
                        >
                            Masuk
                        </Link>
                        <Link
                            to="/registrasi"
                            className="text-center text-sm font-semibold px-4 py-2.5 rounded-lg bg-[#00A63E] text-white hover:bg-[#009935] transition-colors"
                            onClick={() => setMobileOpen(false)}
                        >
                            Registrasi
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;