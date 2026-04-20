// SearchableDropdown.tsx
import { useState, useRef, useEffect } from "react"
import { currentTheme } from "../theme/theme"

interface DropdownProps {
    value: string;
    onChange: (val: string) => void;
    options: string[];
    placeholder?: string;
}

export default function SearchableDropdown({ value, onChange, options, placeholder }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
                setSearch("");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const filtered = options.filter((o) =>
        o.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div ref={ref} className="relative w-full lg:w-auto items-center">
            <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className={`
    flex items-center justify-between
    px-4 py-2.5 min-w-40 w-full
    text-sm font-semibold tracking-tight
    bg-white border border-slate-200/60
    rounded-xl shadow-sm
    hover:bg-slate-50 hover:border-slate-300
    active:scale-[0.98]
    transition-all duration-200 ease-in-out
    cursor-pointer group
  `}
            >
                <span className={`truncate ${!value ? 'text-slate-400' : 'text-slate-400'}`}>
                    {value || placeholder}
                </span>

                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`
      text-slate-500 group-hover:text-slate-900
      transition-transform duration-300 ease-out
      ${open ? "rotate-180" : "rotate-0"}
    `}
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>

            {/* Panel */}
            {open && (
                <div
                    className="absolute top-full left-0 mt-2 w-full lg:w-64 min-w-55 rounded-2xl shadow-xl z-50 overflow-hidden"
                    style={{ background: "white", border: "1px solid #E5E7EB" }}
                >
                    {/* Header row */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <span className="text-sm font-semibold text-gray-700">{value || placeholder}</span>
                        <svg width="10" height="10" fill="#9CA3AF" viewBox="0 0 16 16">
                            <path d="M7.247 4.86 2.451 10.342C1.885 10.987 2.345 12 3.204 12h9.592a1 1 0 0 0 .753-1.659L8.753 4.86a1 1 0 0 0-1.506 0z" />
                        </svg>
                    </div>

                    {/* Search input */}
                    <div className="px-3 py-2 border-b border-gray-100">
                        <input
                            autoFocus
                            className="w-full bg-white rounded-full px-4 py-2 text-sm text-gray-700 outline-none placeholder-gray-400"
                            style={{ border: "1px solid #E5E7EB" }}
                            placeholder="Cari..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Options list */}
                    <ul className="max-h-52 overflow-y-auto py-1">
                        {filtered.length === 0 ? (
                            <li className="px-4 py-3 text-sm text-gray-400">Tidak ditemukan</li>
                        ) : (
                            filtered.map((opt) => {
                                const isActive = opt === value;
                                return (
                                    <li
                                        key={opt}
                                        onClick={() => { onChange(opt); setOpen(false); setSearch(""); }}
                                        className="flex items-center px-4 py-3 text-sm cursor-pointer transition-colors duration-100"
                                        style={{
                                            background: isActive ? currentTheme.primary : "transparent",
                                            color: isActive ? "white" : "#374151",
                                            borderRadius: isActive ? "8px" : "0",
                                            margin: isActive ? "2px 6px" : "0",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActive) e.currentTarget.style.background = "#F3F4F6";
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive) e.currentTarget.style.background = "transparent";
                                        }}
                                    >
                                        {opt}
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}