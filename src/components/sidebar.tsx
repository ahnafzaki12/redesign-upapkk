import { useEffect } from "react"
import type { SidebarProps } from "../types/types";
import { CATEGORY, EDUCATIONS, GREEN, GREEN_DARK, LOCATIONS, DURATIONS, TYPE_OPTIONS } from "../data/constants"


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
        <p className="text-sm font-semibold text-gray-700 mb-2">{children}</p>
    )

    const Divider = () => <hr className="border-gray-100 my-4" />

    const SelectField = ({ value, onChange, options, placeholder }: {
        value: string; onChange: (v: string) => void; options: string[]; placeholder: string
    }) => (
        <div className="relative">
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-500 pr-8 cursor-pointer transition-colors
             hover:border-(--green-dark)
             focus:outline-none focus:border-(--green-dark) focus:ring-1 focus:ring-(--green-dark)"
                style={{ "--green-dark": GREEN_DARK } as React.CSSProperties}
            >
                <option value={options[0]}>{placeholder}</option>
                {options.slice(1).map(o => (
                    <option key={o} value={o}>{o}</option>
                ))}
            </select>
            <svg
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            >
                <path d="m6 9 6 6 6-6" />
            </svg>
        </div>
    )

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
                            className="flex items-center gap-2.5 cursor-pointer"
                            onClick={() => toggleEducation(edu)}
                        >
                            <span
                                className="w-4 h-4 rounded-sm flex items-center justify-center shrink-0 border transition-all duration-150"
                                style={{
                                    background: checked ? GREEN : "white",
                                    borderColor: checked ? GREEN : "#D1D5DB",
                                }}
                            >
                                {checked && (
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M2 5l2.5 2.5 3.5-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </span>
                            <span className="text-sm" style={{ color: checked ? GREEN_DARK : "#374151" }}>
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
                        className="w-full py-2 rounded text-sm font-semibold border-none cursor-pointer text-red-600 bg-red-50 transition-colors"
                        onMouseEnter={e => (e.currentTarget.style.background = "#FEE2E2")}
                        onMouseLeave={e => (e.currentTarget.style.background = "#FEF2F2")}
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
                            style={{ background: GREEN_DARK }}
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
                        <svg width="16" height="16" fill="none" stroke={GREEN_DARK} strokeWidth="2" viewBox="0 0 24 24">
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