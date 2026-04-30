import { useState } from "react"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import { currentTheme } from "../theme/theme"

const HERO_BG = currentTheme.heroStart

const contactInfo = [
    {
        label: "Alamat Kami",
        value: "Jl. Rungkut Madya No.1, Gn. Anyar, Kec. Gn. Anyar, Surabaya, Jawa Timur 60294",
    },
    {
        label: "No Telephone",
        value: "(0623) 18706369",
    },
    {
        label: "Instagram",
        value: "@cdcupnvjt",
    },
]

const Contact_page = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        alert("Pesan berhasil dikirim! Kami akan segera menghubungi Anda.")
        setForm({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" })
    }

    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "10px 14px",
        borderRadius: "6px",
        border: "1px solid #e2e8f0",
        backgroundColor: "#ffffff",
        color: "#1a202c",
        fontSize: "14px",
        outline: "none",
        transition: "border-color 0.15s",
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero */}
            <section className="px-4 sm:px-6 py-16" style={{ background: HERO_BG }}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Kontak Kami
                    </h1>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                        Punya pertanyaan atau masukan? Hubungi kami melalui formulir di bawah ini atau lewat informasi kontak berikut.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="px-4 sm:px-6 py-16">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT — Contact Info + Map */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2" style={{ color: "#1a202c" }}>
                                Informasi Kontak
                            </h2>
                            <p className="text-sm leading-relaxed" style={{ color: "#718096" }}>
                                Kami siap melayani Anda pada jam operasional. Jangan ragu untuk menghubungi kami melalui saluran berikut.
                            </p>
                        </div>

                        {/* Divider */}
                        <div style={{ height: "1px", backgroundColor: "#e2e8f0" }} />

                        {/* Contact items */}
                        <div className="flex flex-col gap-5">
                            {contactInfo.map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-0.5" style={{ color: "#2d3748" }}>
                                            {item.label}
                                        </p>
                                        <p className="text-sm" style={{ color: "#718096" }}>
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Map */}
                        <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #e2e8f0" }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.179561534431!2d112.78574977400235!3d-7.333721192674711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fab87edcad15%3A0xb26589947991eea1!2sUniversitas%20Pembangunan%20Nasional%20%22Veteran%22%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1764942768339!5m2!1sid!2sid"
                                width="100%"
                                height="260"
                                style={{ border: 0, display: "block" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Lokasi UPN Veteran Jawa Timur"
                            />
                        </div>
                    </div>

                    {/* RIGHT — Contact Form */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-1" style={{ color: "#1a202c" }}>
                            Kirim Pesan
                        </h2>
                        <p className="text-sm mb-8" style={{ color: "#718096" }}>
                            Isi formulir berikut dan tim kami akan segera merespons pesan Anda dalam 1×24 jam.
                        </p>

                        <div className="flex flex-col gap-5">
                            {/* Row 1 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium uppercase tracking-wide" style={{ color: "#4a5568" }}>
                                        Nama Depan
                                    </label>
                                    <input
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        placeholder="Nama depan"
                                        style={inputStyle}
                                        onFocus={e => (e.target.style.borderColor = currentTheme.primary)}
                                        onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium uppercase tracking-wide" style={{ color: "#4a5568" }}>
                                        Nama Belakang
                                    </label>
                                    <input
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        placeholder="Nama belakang"
                                        style={inputStyle}
                                        onFocus={e => (e.target.style.borderColor = currentTheme.primary)}
                                        onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
                                    />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium uppercase tracking-wide" style={{ color: "#4a5568" }}>
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="nama@email.com"
                                        style={inputStyle}
                                        onFocus={e => (e.target.style.borderColor = currentTheme.primary)}
                                        onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium uppercase tracking-wide" style={{ color: "#4a5568" }}>
                                        No. Telepon
                                    </label>
                                    <input
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="08xxxxxxxxxx"
                                        style={inputStyle}
                                        onFocus={e => (e.target.style.borderColor = currentTheme.primary)}
                                        onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium uppercase tracking-wide" style={{ color: "#4a5568" }}>
                                    Subjek
                                </label>
                                <input
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="Perihal pesan Anda"
                                    style={inputStyle}
                                    onFocus={e => (e.target.style.borderColor = currentTheme.primary)}
                                    onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
                                />
                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium uppercase tracking-wide" style={{ color: "#4a5568" }}>
                                    Pesan
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tuliskan pesan Anda di sini..."
                                    rows={5}
                                    style={{ ...inputStyle, resize: "vertical" }}
                                    onFocus={e => (e.target.style.borderColor = currentTheme.primary)}
                                    onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
                                />
                            </div>

                            {/* Divider */}
                            <div style={{ height: "1px", backgroundColor: "#e2e8f0" }} />

                            {/* Submit */}
                            <button
                                onClick={handleSubmit}
                                className="py-3 px-8 rounded-md text-sm font-semibold transition-all self-start"
                                style={{ backgroundColor: currentTheme.primary, color: "#ffffff" }}
                                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = currentTheme.primaryHover)}
                                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = currentTheme.primary)}
                            >
                                Kirim Pesan
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Contact_page