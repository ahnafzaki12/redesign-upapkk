import { useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import { jobsData } from "../data/jobData"
import { GREEN, GREEN_DARK, GREEN_LIGHT } from "../data/constants"

const apply_page = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const job = jobsData.find((item) => item.id === Number(id))

    const [form, setForm] = useState({
        email: "",
        fullName: "",
        phone: "",
        experience: "",
        about: "",
        cv: null as File | null,
    })
    const [submitted, setSubmitted] = useState(false)
    const [dragOver, setDragOver] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleFile = (file: File | null) => {
        if (!file) return
        const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
        if (!allowed.includes(file.type)) return alert("Format file harus PDF atau Word (.doc/.docx)")
        if (file.size > 5 * 1024 * 1024) return alert("Ukuran file maksimal 5 MB")
        setForm((prev) => ({ ...prev, cv: file }))
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(false)
        handleFile(e.dataTransfer.files?.[0] ?? null)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    const isValid = form.email && form.fullName && form.phone && form.experience && form.about && form.cv

    const filledCount = [form.fullName, form.email, form.phone, form.experience, form.about, form.cv].filter(Boolean).length
    const progress = Math.round((filledCount / 6) * 100)

    // ── Success screen ──────────────────────────────────────────────────────
    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex flex-col items-center justify-center px-4 py-32 text-center">
                    <div
                        className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
                        style={{ background: GREEN_DARK }}
                    >
                        <svg width="36" height="36" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Lamaran Terkirim!</h2>
                    <p className="text-sm text-gray-500 max-w-sm mb-8 leading-relaxed">
                        Terima kasih, <span className="font-semibold text-gray-700">{form.fullName}</span>. Lamaran kamu untuk posisi{" "}
                        <span className="font-semibold" style={{ color: GREEN }}>{job?.title}</span> telah kami terima.
                        Tim kami akan menghubungi kamu secepatnya.
                    </p>
                    <button
                        onClick={() => navigate("/karir/pekerjaan")}
                        className="px-8 py-3 rounded-xl text-sm font-bold text-white border-none cursor-pointer"
                        style={{ background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)` }}
                    >
                        Lihat Lowongan Lain
                    </button>
                </div>
                <Footer />
            </div>
        )
    }

    // ── Not found ───────────────────────────────────────────────────────────
    if (!job) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Lowongan tidak ditemukan.</p>
            </div>
        )
    }

    const isInternship = job.tag === "Magang";

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* ── HERO ─────────────────────────────────────────────────────────── */}
            <section
                className="px-4 sm:px-6 pt-14 pb-20"
                style={{ background: GREEN_DARK }}
            >
                <div className="max-w-6xl mx-auto">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-1.5 mb-8">
                        <button
                            onClick={() => navigate("/")}
                            className="text-xs font-semibold border-none bg-transparent cursor-pointer transition-colors duration-150"
                            style={{ color: "rgba(255,255,255,0.6)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                        >
                            Beranda
                        </button>
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: "rgba(255,255,255,0.4)" }}>
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                        <button
                            onClick={() => navigate(isInternship ? "/karir/magang" : "/karir/pekerjaan")}
                            className="text-xs font-semibold border-none bg-transparent cursor-pointer transition-colors duration-150"
                            style={{ color: "rgba(255,255,255,0.6)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                        >
                            {isInternship ? "Magang" : "Pekerjaan"}
                        </button>
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: "rgba(255,255,255,0.4)" }}>
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                        <span
                            className="text-xs font-semibold truncate max-w-50"
                            style={{ color: "rgba(255,255,255,0.9)" }}
                        >
                            {job.title}
                        </span>
                    </nav>

                    {/* Title row */}
                    <div className="flex flex-wrap items-end justify-between gap-5">
                        <div className="flex items-start gap-4">
                            {/* Logo */}
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 overflow-hidden bg-white shadow-md border border-white/20">
                                {job.logoUrl ? (
                                    <img
                                        src={job.logoUrl}
                                        alt={job.company}
                                        className="w-full h-full object-contain p-1"
                                        onError={(e) => { e.currentTarget.style.display = "none" }}
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full flex items-center justify-center text-white text-xs font-black tracking-wide"
                                        style={{ background: job.logoColor }}
                                    >
                                        {job.logo}
                                    </div>
                                )}
                            </div>

                            <div>
                                <p
                                    className="text-xs font-bold uppercase mb-1.5 text-white"
                                >
                                    {job.company}
                                </p>
                                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                                    {job.title}
                                </h1>

                                {/* Meta chips */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {[
                                        job.location,
                                        job.type,
                                        job.education.join(", "),
                                        ...(job.duration ? [job.duration] : []),
                                    ].map((label) => (
                                        <span
                                            key={label}
                                            className="px-3 py-1 rounded-lg text-xs font-semibold"
                                            style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}
                                        >
                                            {label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MAIN ─────────────────────────────────────────────────────────── */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24" style={{ marginTop: -32 }}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                    {/* ── LEFT: Form (2/3) ── */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            {/* Section 1 */}
                            <SectionCard number={1} title="Informasi Pribadi">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <Field label="Nama Lengkap" required>
                                        <InputField
                                            name="fullName"
                                            value={form.fullName}
                                            onChange={handleChange}
                                            placeholder="Nama lengkap sesuai KTP"
                                        />
                                    </Field>
                                    <Field label="Alamat Email" required>
                                        <InputField
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="contoh@email.com"
                                        />
                                    </Field>
                                </div>
                                <Field label="Nomor Telepon" required>
                                    <InputField
                                        name="phone"
                                        type="tel"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="08xxxxxxxxxx"
                                    />
                                </Field>
                            </SectionCard>

                            {/* Section 2 */}
                            <SectionCard number={2} title="Latar Belakang">
                                <Field label="Pengalaman Kerja" required>
                                    <select
                                        name="experience"
                                        value={form.experience}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl text-sm text-gray-800 outline-none border border-gray-200 bg-gray-50 transition-all duration-150 cursor-pointer"
                                        style={{
                                            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "right 14px center",
                                            appearance: "none" as const,
                                        }}
                                        onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; e.currentTarget.style.background = "#fff" }}
                                        onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.background = "#f9fafb" }}
                                    >
                                        <option value="" disabled>Pilih lama pengalaman</option>
                                        <option value="fresh">Fresh Graduate / Belum pernah bekerja</option>
                                        <option value="<1">Kurang dari 1 tahun</option>
                                        <option value="1-2">1 – 2 tahun</option>
                                        <option value="3-5">3 – 5 tahun</option>
                                        <option value="5+">Lebih dari 5 tahun</option>
                                    </select>
                                </Field>

                                <Field label="Ceritakan Tentang Diri Anda" required hint="Min. 100 karakter">
                                    <textarea
                                        name="about"
                                        value={form.about}
                                        onChange={handleChange}
                                        placeholder="Ceritakan keahlian, motivasi, dan mengapa kamu tertarik dengan posisi ini..."
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-xl text-sm text-gray-800 outline-none border border-gray-200 bg-gray-50 transition-all duration-150 resize-none leading-relaxed"
                                        onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; e.currentTarget.style.background = "#fff" }}
                                        onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.background = "#f9fafb" }}
                                    />
                                    <p className="text-xs text-gray-400 mt-1 text-right">{form.about.length} karakter</p>
                                </Field>
                            </SectionCard>

                            {/* Section 3 — Upload CV */}
                            <SectionCard number={3} title="Upload CV">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                                />

                                {form.cv ? (
                                    <div
                                        className="flex items-center gap-4 p-4 rounded-xl border"
                                        style={{ borderColor: GREEN, background: GREEN_LIGHT }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                                            style={{ background: GREEN }}
                                        >
                                            <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                                <polyline points="14,2 14,8 20,8" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-800 truncate">{form.cv.name}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{(form.cv.size / 1024).toFixed(0)} KB</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setForm((p) => ({ ...p, cv: null }))}
                                            className="w-8 h-8 rounded-lg bg-white text-gray-400 text-lg flex items-center justify-center border-none cursor-pointer shrink-0 shadow-sm"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                                        onDragLeave={() => setDragOver(false)}
                                        onDrop={handleDrop}
                                        className="flex flex-col items-center justify-center gap-3 py-12 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-150"
                                        style={{
                                            borderColor: dragOver ? GREEN : "#d1d5db",
                                            background: dragOver ? GREEN_LIGHT : "#f9fafb",
                                        }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                            style={{ background: dragOver ? GREEN_LIGHT : "#f3f4f6" }}
                                        >
                                            <svg width="22" height="22" fill="none" stroke={dragOver ? GREEN : "#9ca3af"} strokeWidth="1.8" viewBox="0 0 24 24">
                                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                                <polyline points="17 8 12 3 7 8" />
                                                <line x1="12" y1="3" x2="12" y2="15" />
                                            </svg>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-semibold text-gray-700">Klik atau seret file ke sini</p>
                                            <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX · Maks. 5 MB</p>
                                        </div>
                                    </div>
                                )}
                            </SectionCard>

                            {/* Submit */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="w-full py-3.5 rounded-xl text-sm font-bold text-white border-none transition-all duration-200"
                                    style={{
                                        background: isValid
                                            ? `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)`
                                            : "#d1d5db",
                                        cursor: isValid ? "pointer" : "not-allowed",
                                    }}
                                    onMouseEnter={(e) => { if (isValid) e.currentTarget.style.opacity = "0.9" }}
                                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1" }}
                                >
                                    Kirim Lamaran
                                </button>
                                <p className="text-xs text-center text-gray-400 mt-3">
                                    Dengan mengirimkan lamaran, kamu menyetujui ketentuan penggunaan data kami.
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* ── RIGHT: Sidebar (1/3) ── */}
                    <div className="flex flex-col gap-5 lg:sticky lg:top-6">

                        {/* Progress checklist */}
                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <h3 className="text-sm font-bold text-gray-800 mb-4">Kelengkapan Formulir</h3>
                            <div className="flex flex-col gap-3">
                                {[
                                    { label: "Nama Lengkap", done: !!form.fullName },
                                    { label: "Email", done: !!form.email },
                                    { label: "Nomor Telepon", done: !!form.phone },
                                    { label: "Pengalaman Kerja", done: !!form.experience },
                                    { label: "Tentang Diri", done: !!form.about },
                                    { label: "Upload CV", done: !!form.cv },
                                ].map(({ label, done }) => (
                                    <div key={label} className="flex items-center gap-3">
                                        <div
                                            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
                                            style={{
                                                background: done ? GREEN : "#f3f4f6",
                                                border: done ? "none" : "1.5px solid #e5e7eb",
                                            }}
                                        >
                                            {done && (
                                                <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    <path d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className={`text-xs font-medium ${done ? "text-gray-800" : "text-gray-400"}`}>{label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Progress bar */}
                            <div className="mt-5">
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-gray-400 font-medium">Progress</span>
                                    <span className="font-bold" style={{ color: GREEN }}>{progress}%</span>
                                </div>
                                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${progress}%`,
                                            background: `linear-gradient(90deg, ${GREEN} 0%, ${GREEN_DARK} 100%)`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Job summary */}
                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <h3 className="text-sm font-bold text-gray-800 mb-4">Ringkasan Posisi</h3>
                            <div className="flex flex-col gap-4">
                                {[
                                    { label: "Perusahaan", value: job.company },
                                    { label: "Posisi", value: job.title },
                                    { label: "Lokasi", value: job.location },
                                    { label: "Tipe", value: job.type },
                                    ...(job.salary ? [{ label: "Gaji", value: job.salary }] : []),
                                    ...(job.deadline ? [{ label: "Deadline", value: job.deadline }] : []),
                                ].map(({ label, value }) => (
                                    <div key={label}>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
                                        <p className="text-sm font-semibold text-gray-800">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        {job.tags && job.tags.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 shadow-md">
                                <h3 className="text-sm font-bold text-gray-800 mb-3">Keunggulan</h3>
                                <div className="flex flex-wrap gap-2">
                                    {job.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1.5 rounded-full text-xs font-bold"
                                            style={{ background: GREEN_LIGHT, color: GREEN }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionCard({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)` }}
                >
                    {number}
                </div>
                <span className="text-sm font-bold text-gray-800">{title}</span>
            </div>
            <div className="px-6 py-6 flex flex-col gap-5">{children}</div>
        </div>
    )
}

function Field({ label, required, hint, children }: {
    label: string; required?: boolean; hint?: string; children: React.ReactNode
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                {label}
                {required && <span className="text-red-400 ml-0.5">*</span>}
                {hint && <span className="ml-2 normal-case font-normal text-gray-400 tracking-normal">{hint}</span>}
            </label>
            {children}
        </div>
    )
}

function InputField({ name, value, onChange, placeholder, type = "text" }: {
    name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; type?: string
}) {
    return (
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
            className="w-full px-4 py-3 rounded-xl text-sm text-gray-800 outline-none border border-gray-200 bg-gray-50 transition-all duration-150"
            onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; e.currentTarget.style.background = "#fff" }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.background = "#f9fafb" }}
        />
    )
}

export default apply_page