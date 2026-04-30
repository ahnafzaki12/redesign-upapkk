// SearchableDropdown.tsx
import { useState, useRef, useEffect } from "react"
import { currentTheme } from "../theme/theme"

const ACCENT = currentTheme.primary
const ACCENT_DARK = currentTheme.heroEnd
const ACCENT_LIGHT = currentTheme.surfaceAlt

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
        <div ref={ref} className="relative w-full items-center">
            <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className="w-full flex items-center justify-between rounded-md border px-4 py-3 text-sm bg-white transition-all duration-200 shadow-sm"
                style={{
                    borderColor: open ? ACCENT : "#E5E7EB",
                    boxShadow: open
                        ? "0 0 0 3px rgba(var(--pg-primary-rgb), 0.12)"
                        : "0 1px 2px rgba(0,0,0,0.03)",
                    color: !value ? "#9CA3AF" : "#111827",
                }}
            >
                <span className="truncate text-left font-medium">
                    {!value ? placeholder : value}
                </span>

                <svg
                    className="shrink-0 transition-transform duration-200"
                    style={{
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        color: open ? ACCENT_DARK : "#9CA3AF",
                    }}
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            {/* Panel */}
            {open && (
                <div
                    className="absolute z-30 mt-2 w-full overflow-hidden rounded border bg-white shadow-lg"
                    style={{
                        borderColor: "#E5E7EB",
                        boxShadow: "0 12px 32px rgba(17, 24, 39, 0.10)",
                    }}
                >
                    {/* Search input */}
                    <div className="p-3 border-b border-gray-100 bg-gray-50/50">
                        <div className="relative">
                            <input
                                autoFocus
                                className="w-full bg-white rounded-md pl-10 pr-4 py-2.5 text-[14px] text-gray-700 outline-none border border-gray-200 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-all placeholder-gray-400"
                                placeholder="Cari..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                    </div>

                    {/* Options list */}
                    <div className="max-h-60 overflow-y-auto py-2">
                        {filtered.length === 0 ? (
                            <div className="px-4 py-3 text-sm text-gray-400">Tidak ditemukan</div>
                        ) : (
                            filtered.map((opt) => {
                                const isActive = opt === value;
                                return (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => { onChange(opt); setOpen(false); setSearch(""); }}
                                        className="w-full flex items-center justify-between px-4 py-3 text-sm text-left transition-colors"
                                        style={{
                                            background: isActive ? ACCENT_LIGHT : "white",
                                            color: isActive ? ACCENT_DARK : "#374151",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActive) e.currentTarget.style.background = "#F9FAFB";
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive) e.currentTarget.style.background = "white";
                                        }}
                                    >
                                        {opt}
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}