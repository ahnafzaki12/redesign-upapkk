import { useState } from "react"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import { currentTheme } from "../theme/theme"

const HERO_BG = currentTheme.heroStart

const faqs = [
  {
    question: "Apa itu UPA-PKK?",
    answer:
      "Unit Pendukung Akademik Pengembangan Karir dan Kewirausahaan adalah Lembaga yang mengkoordinir semua kegiatan pencarian kerja bagi lulusan baru, mengembangkan kegiatan civitas akademika dalam kerjasama dengan stake holders (masyarakat dan dunia usaha) untuk mengintegrasikan kegiatan akademik dengan dunia kerja.",
  },
  {
    question: "Bagaimana caranya mendaftar menjadi member UPA-PKK?",
    answer: (
      <>
        Silahkan melakukan registrasi{' '}
        <a
          href="https://upapkk.upnjatim.ac.id/faq"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: currentTheme.primary, textDecoration: "underline" }}
        >
          disini
        </a>
        {". Dan melengkapi data diri Anda yang digunakan sebagai CV."}
      </>
    ),
  },
  {
    question:
      "Apakah member UPA-PKK hanya untuk mahasiswa atau alumni UPN Veteran Jawa Timur saja?",
    answer: (
      <>
        Tidak, mahasiswa atau alumni diluar UPN Veteran Jawa Timur / umum dapat
        mendaftar dengan memilih tipe keanggotaan "Umum" pada{' '}
        <a
          href="https://upapkk.upnjatim.ac.id/faq"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: currentTheme.primary, textDecoration: "underline" }}
        >
          link
        </a>{' '}
        berikut.
      </>
    ),
  },
  {
    question:
      "Bagaimana caranya melamar lowongan secara online melalui web UPA-PKK?",
    answer:
      "Setelah melakukan registrasi, silahkan login untuk masuk ke akun Anda. Pastikan data diri/CV Anda sudah dilengkapi. Pilih menu Karir dan Magang → Lowongan kemudian tekan tombol Lamar pada lowongan kerja yang ingin Anda lamar.",
  },
  {
    question:
      "Setelah membuat akun, kenapa saya tidak mendapatkan email aktivasi dari UPA-PKK?",
    answer:
      "Silahkan cek folder spam di halaman email anda. Jika terhapus atau memang tidak ada, silahkan kontak customer service yang tertera di halaman kontak kami untuk validasi manual.",
  },
  {
    question: "Kenapa saya tidak mendapatkan panggilan tes?",
    answer:
      "Perusahaan akan menghubungi pelamar. Kemungkinan Anda tidak mendapat panggilan tes adalah karena data diri Anda tidak sesuai dengan ketentuan dan syarat yang diinginkan perusahaan. Cek kembali data diri, CV dan syarat-syarat dokumen yang diperlukan sebelum memasukkan lamaran. Adapun beberapa perusahaan melakukan secara offline.",
  },
  {
    question:
      "Saya sudah daftar, tetapi ketika login tidak bisa padahal password benar?",
    answer:
      'Silahkan menekan "Lupa kata kunci" terlebih dahulu, password baru akan dikirim melalui email (cek spam jika tidak ada). Setelah mendapat password baru silahkan login lagi, Anda bisa memperbarui password agar mudah diingat.',
  },
]

const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string
  answer: React.ReactNode
  isOpen: boolean
  onClick: () => void
}) => {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300 bg-white"
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
      >
        <span
          className="font-semibold text-base"
          style={{ color: isOpen ? currentTheme.primary : currentTheme.text }}
        >
          {question}
        </span>
        <span
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg font-light transition-all"
          style={{
            backgroundColor: isOpen ? currentTheme.primary : currentTheme.surfaceStrong,
            color: isOpen ? currentTheme.white : currentTheme.textMuted,
          }}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="px-6 pb-5">
          <div
            className="w-full h-px mb-4"
            style={{ backgroundColor: currentTheme.border }}
          />
          <p
            className="text-sm leading-relaxed"
            style={{ color: currentTheme.textMuted }}
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}

const FAQ_page = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="px-4 sm:px-6 py-16" style={{ background: HERO_BG }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Temukan jawaban atas pertanyaan umum seputar layanan, proses, dan
            informasi terkait di halaman FAQ kami. 
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.text }}>
              Pertanyaan yang Sering Ditanyakan{" "}
              <span style={{ color: currentTheme.primarySoft }}>(FAQs)</span>
            </h2>
            <p className="text-sm" style={{ color: currentTheme.textMuted }}>
              Tidak menemukan jawaban yang Anda cari? Hubungi kami langsung
              melalui halaman kontak.
            </p>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onClick={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default FAQ_page