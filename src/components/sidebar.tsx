import { useEffect, useRef, useState } from "react"
import type { SidebarProps } from "../types/types";
import { CATEGORY, EDUCATIONS, LOCATIONS, DURATIONS, TYPE_OPTIONS, INDUSTRIES, PACKAGES } from "../data/constants"
import { currentTheme } from "../theme/theme"

const ACCENT = currentTheme.primary
const ACCENT_DARK = currentTheme.heroEnd
const ACCENT_LIGHT = currentTheme.surfaceAlt


// ── Shared filter fields ──────────────────────────────────────────────────────

interface FilterFieldsProps extends SidebarProps {
    onApply?: () => void
}

function FilterFields({
    location, setLocation,
    category, setCategory,
    education, setEducation,
    duration, setDuration,
    hasActiveFilter,
    resetFilters,
    showDuration = true,
    type, setType,
    onApply,
}: FilterFieldsProps) {
    const toggleEducation = (edu: string) => {
        if (edu === "Semua Jenjang") { setEducation(["Semua Jenjang"]); return }
        const withoutAll = education.filter(e => e !== "Semua Jenjang")
        if (withoutAll.includes(edu)) {
            const next = withoutAll.filter(e => e !== edu)
            setEducation(next.length === 0 ? ["Semua Jenjang"] : next)
        } else {
            setEducation([...withoutAll, edu])
        }
    }

    const SectionLabel = ({ children }: { children: React.ReactNode }) => (
        <p className="text-[13px] font-semibold text-gray-800 mb-2.5 tracking-[0.01em]">
            {children}
        </p>
    )

    const Divider = () => <div className="h-px bg-gray-100 my-5" />

    const SelectField = ({
        value,
        onChange,
        options,
        placeholder,
    }: {
        value: string
        onChange: (v: string) => void
        options: string[]
        placeholder: string
    }) => {
        const [open, setOpen] = useState(false)
        const dropdownRef = useRef<HTMLDivElement | null>(null)

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    dropdownRef.current &&
                    !dropdownRef.current.contains(event.target as Node)
                ) {
                    setOpen(false)
                }
            }

            document.addEventListener("mousedown", handleClickOutside)
            return () => document.removeEventListener("mousedown", handleClickOutside)
        }, [])

        return (
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setOpen(prev => !prev)}
                    className="w-full flex items-center justify-between rounded-md border px-4 py-3 text-sm bg-white transition-all duration-200 shadow-sm"
                    style={{
                        borderColor: open ? ACCENT : "#E5E7EB",
                        boxShadow: open
                            ? "0 0 0 3px rgba(var(--pg-primary-rgb), 0.12)"
                            : "0 1px 2px rgba(0,0,0,0.03)",
                        color: value === options[0] ? "#9CA3AF" : "#111827",
                    }}
                >
                    <span className="truncate">
                        {value === options[0] ? placeholder : value}
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

                {open && (
                    <div
                        className="absolute z-30 mt-2 w-full overflow-hidden rounded border bg-white shadow-lg"
                        style={{
                            borderColor: "#E5E7EB",
                            boxShadow: "0 12px 32px rgba(17, 24, 39, 0.10)",
                        }}
                    >
                        <div className="max-h-60 overflow-y-auto py-2">
                            {options.map((option) => {
                                const isActive = value === option
                                const isPlaceholder = option === options[0]

                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => {
                                            onChange(option)
                                            setOpen(false)
                                        }}
                                        className="w-full flex items-center justify-between px-4 py-3 text-sm text-left transition-colors"
                                        style={{
                                            background: isActive ? ACCENT_LIGHT : "white",
                                            color: isActive
                                                ? ACCENT_DARK
                                                : isPlaceholder
                                                    ? "#9CA3AF"
                                                    : "#374151",
                                        }}
                                        onMouseEnter={e => {
                                            if (!isActive) {
                                                e.currentTarget.style.background = "#F9FAFB"
                                            }
                                        }}
                                        onMouseLeave={e => {
                                            if (!isActive) {
                                                e.currentTarget.style.background = "white"
                                            }
                                        }}
                                    >
                                        <span className="truncate">{option}</span>

                                        {isActive && (
                                            <svg
                                                width="16"
                                                height="16"
                                                fill="none"
                                                stroke={ACCENT}
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    d="M5 13l4 4L19 7"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <>
            <SectionLabel>Lokasi</SectionLabel>
            <SelectField value={location} onChange={setLocation} options={LOCATIONS} placeholder="Lokasi" />

            <Divider />

            <SectionLabel>Kategori</SectionLabel>
            <SelectField value={category} onChange={setCategory} options={CATEGORY} placeholder="Kategori" />

            <Divider />

            {showDuration && (
                <>
                    <SectionLabel>Durasi</SectionLabel>
                    <SelectField value={duration} onChange={setDuration} options={DURATIONS} placeholder="Durasi" />
                    <Divider />
                </>
            )}

            <SectionLabel>Tipe Pekerjaan</SectionLabel>
            <SelectField value={type} onChange={setType} options={TYPE_OPTIONS} placeholder="Tipe" />

            <Divider />

            <SectionLabel>Jenjang Pendidikan</SectionLabel>
            <div className="flex flex-col gap-2.5 mt-1">
                {EDUCATIONS.map(edu => {
                    const checked = education.includes(edu)
                    return (
                        <label
                            key={edu}
                            className="flex items-center gap-3 cursor-pointer rounded-md px-3 py-2 transition-colors"
                            style={{
                                background: "transparent",
                            }}
                            onClick={() => toggleEducation(edu)}
                        >
                            <span
                                className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all duration-150"
                                style={{
                                    background: checked ? ACCENT : "white",
                                    borderColor: checked ? ACCENT : "#D1D5DB", 
                                }}
                            >
                                {checked && (
                                    <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                                        <path
                                            d="M2 5l2.5 2.5 3.5-4"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </span>

                            <span
                                className="text-sm transition-colors"
                                style={{ color: checked ? ACCENT_DARK : "#374151" }}
                            >
                                {edu}
                            </span>
                        </label>
                    )
                })}
            </div>

            {hasActiveFilter && (
                <>
                    <Divider />
                    <button
                        onClick={resetFilters}
                        className="w-full py-2 rounded text-sm font-semibold border-none cursor-pointer text-red-600 transition-colors"
                    >
                        Reset Filter
                    </button>
                </>
            )}

            {onApply && (
                <>
                    <div className="mt-4">
                        <button
                            onClick={onApply}
                            className="w-full py-2.5 rounded text-sm font-semibold border-none cursor-pointer text-white transition-colors"
                            style={{ background: ACCENT_DARK }}
                        >
                            Terapkan Filter
                        </button>
                    </div>
                </>
            )}
        </>
    )
}


// ── Desktop Sidebar ───────────────────────────────────────────────────────────

export function FilterSidebar(props: SidebarProps) {
    return (
        <aside className="w-60 shrink-0">
            <div className="bg-white border border-gray-200 rounded p-5">
                <FilterFields {...props} />
            </div>
        </aside>
    )
}


// ── Mobile Drawer ─────────────────────────────────────────────────────────────

interface DrawerProps extends SidebarProps {
    open: boolean
    onClose: () => void
}

export function FilterDrawer({ open, onClose, ...filterProps }: DrawerProps) {
    // Lock body scroll when drawer is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [open])

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="fixed inset-0 z-40 transition-opacity duration-300 lg:hidden"
                style={{
                    background: "rgba(0,0,0,0.4)",
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? "auto" : "none",
                }}
            />

            {/* Drawer panel — slides up from bottom */}
            <div
                className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl lg:hidden"
                style={{
                    transform: open ? "translateY(0)" : "translateY(100%)",
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    maxHeight: "85vh",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 -4px 24px rgba(0,0,0,0.12)",
                }}
            >
                {/* Drag handle + header */}
                <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100 shrink-0">
                    <div className="flex items-center gap-2">
                            <svg width="16" height="16" fill="none" stroke={ACCENT_DARK} strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M3 6h18M7 12h10M11 18h2" strokeLinecap="round" />
                        </svg>
                        <h2 className="text-sm font-semibold text-gray-800">Filter</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 border-none bg-gray-100 cursor-pointer"
                        aria-label="Close filter"
                    >
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable filter content */}
                <div className="overflow-y-auto flex-1 px-5 py-4">
                    <FilterFields
                        {...filterProps}
                        onApply={onClose}
                    />
                </div>
            </div>
        </>
    )
}


// ── Company Filter Components ─────────────────────────────────────────────────

interface CompanyFilterProps {
    location: string
    setLocation: (v: string) => void
    industry: string
    setIndustry: (v: string) => void
    pkg: string
    setPkg: (v: string) => void
    hasActiveFilter: boolean
    resetFilters: () => void
}

interface CompanyFilterFieldsProps extends CompanyFilterProps {
    onApply?: () => void
}

function CompanyFilterFields({
    location, setLocation,
    industry, setIndustry,
    pkg, setPkg,
    hasActiveFilter,
    resetFilters,
    onApply,
}: CompanyFilterFieldsProps) {
    const SectionLabel = ({ children }: { children: React.ReactNode }) => (
        <p className="text-[13px] font-semibold text-gray-800 mb-2.5 tracking-[0.01em]">
            {children}
        </p>
    )

    const Divider = () => <div className="h-px bg-gray-100 my-5" />

    const SelectField = ({
        value,
        onChange,
        options,
        placeholder,
    }: {
        value: string
        onChange: (v: string) => void
        options: string[]
        placeholder: string
    }) => {
        const [open, setOpen] = useState(false)
        const dropdownRef = useRef<HTMLDivElement | null>(null)

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    dropdownRef.current &&
                    !dropdownRef.current.contains(event.target as Node)
                ) {
                    setOpen(false)
                }
            }

            document.addEventListener("mousedown", handleClickOutside)
            return () => document.removeEventListener("mousedown", handleClickOutside)
        }, [])

        return (
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setOpen(prev => !prev)}
                    className="w-full flex items-center justify-between rounded-md border px-4 py-3 text-sm bg-white transition-all duration-200 shadow-sm"
                    style={{
                        borderColor: open ? ACCENT : "#E5E7EB",
                        boxShadow: open
                            ? "0 0 0 3px rgba(var(--pg-primary-rgb), 0.12)"
                            : "0 1px 2px rgba(0,0,0,0.03)",
                        color: value === options[0] ? "#9CA3AF" : "#111827",
                    }}
                >
                    <span className="truncate">
                        {value === options[0] ? placeholder : value}
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

                {open && (
                    <div
                        className="absolute z-30 mt-2 w-full overflow-hidden rounded border bg-white shadow-lg"
                        style={{
                            borderColor: "#E5E7EB",
                            boxShadow: "0 12px 32px rgba(17, 24, 39, 0.10)",
                        }}
                    >
                        <div className="max-h-60 overflow-y-auto py-2">
                            {options.map((option) => {
                                const isActive = value === option
                                const isPlaceholder = option === options[0]

                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => {
                                            onChange(option)
                                            setOpen(false)
                                        }}
                                        className="w-full flex items-center justify-between px-4 py-3 text-sm text-left transition-colors"
                                        style={{
                                            background: isActive ? ACCENT_LIGHT : "white",
                                            color: isActive
                                                ? ACCENT_DARK
                                                : isPlaceholder
                                                    ? "#9CA3AF"
                                                    : "#374151",
                                        }}
                                        onMouseEnter={e => {
                                            if (!isActive) {
                                                e.currentTarget.style.background = "#F9FAFB"
                                            }
                                        }}
                                        onMouseLeave={e => {
                                            if (!isActive) {
                                                e.currentTarget.style.background = "white"
                                            }
                                        }}
                                    >
                                        <span className="truncate">{option}</span>

                                        {isActive && (
                                            <svg
                                                width="16"
                                                height="16"
                                                fill="none"
                                                stroke={ACCENT}
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    d="M5 13l4 4L19 7"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <>
            <SectionLabel>Lokasi</SectionLabel>
            <SelectField value={location} onChange={setLocation} options={LOCATIONS} placeholder="Lokasi" />

            <Divider />

            <SectionLabel>Industri</SectionLabel>
            <SelectField value={industry} onChange={setIndustry} options={INDUSTRIES} placeholder="Industri" />

            <Divider />

            <SectionLabel>Paket</SectionLabel>
            <SelectField value={pkg} onChange={setPkg} options={PACKAGES} placeholder="Paket" />

            {hasActiveFilter && (
                <>
                    <Divider />
                    <button
                        onClick={resetFilters}
                        className="w-full py-2 rounded text-sm font-semibold border-none cursor-pointer text-red-600 transition-colors"
                    >
                        Reset Filter
                    </button>
                </>
            )}

            {onApply && (
                <>
                    <div className="mt-4">
                        <button
                            onClick={onApply}
                            className="w-full py-2.5 rounded text-sm font-semibold border-none cursor-pointer text-white transition-colors"
                            style={{ background: ACCENT_DARK }}
                        >
                            Terapkan Filter
                        </button>
                    </div>
                </>
            )}
        </>
    )
}


// ── Company Desktop Sidebar ───────────────────────────────────────────────────

export function CompanyFilterSidebar(props: CompanyFilterProps) {
    return (
        <aside className="w-60 shrink-0">
            <div className="bg-white border border-gray-200 rounded p-5">
                <CompanyFilterFields {...props} />
            </div>
        </aside>
    )
}


// ── Company Mobile Drawer ─────────────────────────────────────────────────────

interface CompanyDrawerProps extends CompanyFilterProps {
    open: boolean
    onClose: () => void
}

export function CompanyFilterDrawer({ open, onClose, ...filterProps }: CompanyDrawerProps) {
    // Lock body scroll when drawer is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [open])

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="fixed inset-0 z-40 transition-opacity duration-300 lg:hidden"
                style={{
                    background: "rgba(0,0,0,0.4)",
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? "auto" : "none",
                }}
            />

            {/* Drawer panel — slides up from bottom */}
            <div
                className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl lg:hidden"
                style={{
                    transform: open ? "translateY(0)" : "translateY(100%)",
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    maxHeight: "85vh",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 -4px 24px rgba(0,0,0,0.12)",
                }}
            >
                {/* Drag handle + header */}
                <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100 shrink-0">
                    <div className="flex items-center gap-2">
                        <svg width="16" height="16" fill="none" stroke={ACCENT_DARK} strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M3 6h18M7 12h10M11 18h2" strokeLinecap="round" />
                        </svg>
                        <h2 className="text-sm font-semibold text-gray-800">Filter</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 border-none bg-gray-100 cursor-pointer"
                        aria-label="Close filter"
                    >
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable filter content */}
                <div className="overflow-y-auto flex-1 px-5 py-4">
                    <CompanyFilterFields
                        {...filterProps}
                        onApply={onClose}
                    />
                </div>
            </div>
        </>
    )
}