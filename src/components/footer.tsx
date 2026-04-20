import { useState } from "react"
import { currentTheme } from "../theme/theme"

const FOOTER_COLUMNS = [
  {
    id: "menu-1",
    title: "MENU",
    items: ["Lowongan Pekerjaan", "Lowongan Magang", "Acara", "CV Builder"],
  },
  {
    id: "menu-2",
    title: "MENU",
    items: ["Kewirausahaan", "Alumni", "Artikel", "Tentang Kami"],
  },
  {
    id: "menu-3",
    title: "TAUTAN",
    items: ["UPN \"Veteran\" Jawa Timur", "FAQs", "Kontak Kami", "Alamat Kampus"],
  },
] as const

const FOOTER_THEME = {
  text: currentTheme.text,
  textMuted: currentTheme.textMuted,
  border: currentTheme.border,
  accent: currentTheme.heroStart,
  accentDark: currentTheme.heroEnd,
  socialIdle: "rgba(255,255,255,0.15)",
} as const

const Footer = () => {
  const [activeFooterLink, setActiveFooterLink] = useState<string | null>(null)

  return (
    <footer className="bg-white font-sans" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: FOOTER_THEME.text }}>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-[5%] py-8 lg:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Brand + Contact */}
          <div className="lg:col-span-3">
            {/* Logo */}
            <div className="mb-3 lg:mb-1.5 max-w-45">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Divider */}
            <div className="h-px mb-4 lg:mb-2" style={{ background: FOOTER_THEME.border }} />

            {/* Contact Info */}
            <div className="space-y-5 lg:space-y-2.5 text-sm">
              {/* Address */}
              <div>
                <p className="text-[0.82rem] leading-relaxed m-0" style={{ color: FOOTER_THEME.textMuted }}>
                  Gedung Rektorat UPN "Veteran" Jawa Timur
                </p>
                <p className="text-[0.82rem] leading-relaxed m-0" style={{ color: FOOTER_THEME.textMuted }}>
                  Jl. Raya Rungkut Madya, Surabaya 60294
                </p>
              </div>

              {/* Customer Service */}
              <div>
                <p className="text-[0.75rem] font-bold uppercase tracking-widest m-0 mb-1" style={{ color: FOOTER_THEME.text }}>
                  Layanan Mahasiswa
                </p>
                <p className="text-[0.82rem] m-0" style={{ color: FOOTER_THEME.textMuted }}>
                  Telp: (031) 8706369
                </p>
                <p className="text-[0.82rem] m-0" style={{ color: FOOTER_THEME.textMuted }}>
                  upapkk@upnjatim.ac.id
                </p>
              </div>

              {/* Employer Service */}
              <div>
                <p className="text-[0.75rem] font-bold uppercase tracking-widest m-0 mb-1" style={{ color: FOOTER_THEME.text }}>
                  Layanan Perusahaan
                </p>
                <p className="text-[0.82rem] m-0" style={{ color: FOOTER_THEME.textMuted }}>
                  Telp: (031) 8706369
                </p>
                <p className="text-[0.82rem] m-0" style={{ color: FOOTER_THEME.textMuted }}>
                  employer@upnjatim.ac.id
                </p>
              </div>
            </div>
          </div>

          {/* Right: Navigation + Social */}
          <div className="lg:col-span-9 flex flex-col gap-8">

            {/* Nav Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:ml-24">
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.id}>
                  <h4
                    className="text-[0.75rem] font-bold tracking-widest mb-4 pb-2 inline-block border-b-2"
                    style={{ color: FOOTER_THEME.text, borderColor: FOOTER_THEME.accent }}
                  >
                    {column.title}
                  </h4>
                  <ul className="list-none m-0 p-0 space-y-1.5">
                    {column.items.map((item) => {
                      const linkKey = `${column.id}-${item}`
                      const isSelected = activeFooterLink === linkKey

                      return (
                        <li key={item}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setActiveFooterLink(linkKey)
                            }}
                            onFocus={() => setActiveFooterLink(linkKey)}
                            className={`footer-option-link text-[0.85rem] ${isSelected ? "selected" : ""}`}
                          >
                            <span className="footer-option-link-dot" />
                            <span className="footer-option-link-label">{item}</span>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}

            </div>

            {/* Social Media Banner */}
            <div className="w-full lg:max-w-2xl lg:mt-6 lg:ml-22">
              <div className="rounded-full px-3 py-2 flex flex-row items-center justify-between gap-2 lg:pl-8 lg:py-3" style={{ background: FOOTER_THEME.accentDark }}>
                <p className="text-[0.7rem] sm:text-base font-medium text-white m-0">
                  ikuti media sosial resmi UPAPKK
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-2 shrink-0">

                  {/* Facebook */}
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                    style={{ background: FOOTER_THEME.socialIdle }}
                    onMouseEnter={e => (e.currentTarget.style.background = FOOTER_THEME.accent)}
                    onMouseLeave={e => (e.currentTarget.style.background = FOOTER_THEME.socialIdle)}
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                    style={{ background: FOOTER_THEME.socialIdle }}
                    onMouseEnter={e => (e.currentTarget.style.background = FOOTER_THEME.accent)}
                    onMouseLeave={e => (e.currentTarget.style.background = FOOTER_THEME.socialIdle)}
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>

                  {/* X / Twitter */}
                  <a
                    href="#"
                    aria-label="X"
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                    style={{ background: FOOTER_THEME.socialIdle }}
                    onMouseEnter={e => (e.currentTarget.style.background = FOOTER_THEME.accent)}
                    onMouseLeave={e => (e.currentTarget.style.background = FOOTER_THEME.socialIdle)}
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="#"
                    aria-label="YouTube"
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                    style={{ background: FOOTER_THEME.socialIdle }}
                    onMouseEnter={e => (e.currentTarget.style.background = FOOTER_THEME.accent)}
                    onMouseLeave={e => (e.currentTarget.style.background = FOOTER_THEME.socialIdle)}
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white border-t text-center py-3.5 px-[5%]" style={{ borderColor: FOOTER_THEME.border }}>
        <p className="text-[0.78rem] m-0" style={{ color: FOOTER_THEME.textMuted }}>
          © Pusat Pengembangan Akademik &amp; Karir Kemahasiswaan UPN "Veteran" Jawa Timur
        </p>
      </div>

    </footer>
  )
}

export default Footer