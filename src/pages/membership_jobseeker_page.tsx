import { Link } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { currentTheme } from "../theme/theme";

const MEMBERSHIP_TYPES = [
  {
    title: "Mahasiswa/Alumni UPN",
    points: [
      "Biaya gratis dan dapat digunakan jangka panjang.",
      "Siapkan KTM, SKL, atau ijazah untuk kebutuhan verifikasi.",
      "Jika akun pernah aktif, proses perpanjangan dapat diajukan tanpa registrasi ulang penuh.",
    ],
  },
  {
    title: "Mahasiswa/Alumni Non-UPN",
    points: [
      "Paket keanggotaan tersedia dalam beberapa durasi (3 bulan, 6 bulan, atau seumur hidup).",
      "Aktivasi akun dilakukan setelah bukti pembayaran dan data administrasi diterima.",
      "Gunakan format file .jpg atau .pdf dengan ukuran yang disarankan agar proses lebih cepat.",
    ],
  },
];

const NEW_REGISTRATION_STEPS = [
  "Kunjungi halaman registrasi daring, lalu isi formulir dengan data yang valid.",
  "Untuk pendaftar UPN, unggah dokumen identitas akademik yang relevan.",
  "Untuk pendaftar Non-UPN, selesaikan pembayaran sesuai instruksi admin.",
  "Simpan bukti pembayaran/dokumen dalam format yang diminta, lalu kirim melalui kanal konfirmasi.",
];

const RENEWAL_STEPS = [
  "Akun yang kedaluwarsa tidak perlu membuat akun baru dari awal.",
  "Siapkan data dasar: nama lengkap, jurusan, email aktif, dan nomor ponsel.",
  "UPN: lampirkan dokumen akademik pendukung dan kirim sesuai panduan admin.",
  "Non-UPN: lakukan pembayaran perpanjangan, kemudian kirim konfirmasi pembayaran.",
];

const ACTIVATION_NOTES = [
  "Estimasi aktivasi maksimal 2 x 24 jam kerja setelah data valid diterima.",
  "Jika pengiriman dilakukan di luar jam kerja, proses dipindahkan ke hari kerja berikutnya.",
  "Jika belum aktif setelah estimasi waktu, segera hubungi administrator.",
];

const CONTACTS = [
  {
    label: "Email Admin",
    value: "upapkk@upnjatim.ac.id",
  },
  {
    label: "Customer Service",
    value: "(+62-22) 2509177",
  },
  {
    label: "Employer Service",
    value: "(+62-22) 2509162",
  },
];

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2.5">
      {items.map((item, index) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-gray-700">
          <span
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: currentTheme.primary }}
          >
            {index + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function GuideSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(var(--pg-primary-rgb),0.08)] sm:p-8">
      <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function MembershipJobseekerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="relative overflow-hidden px-4 pb-20 pt-14 sm:px-6">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(130deg, ${currentTheme.heroStart} 0%, ${currentTheme.heroEnd} 78%)`,
          }}
        />
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-white/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <nav className="mb-8 flex items-center gap-2 text-xs font-semibold text-white/70">
            <Link to="/" className="transition-colors hover:text-white">
              Beranda
            </Link>
            <span>/</span>
            <Link to="/registrasi" className="transition-colors hover:text-white">
              Registrasi
            </Link>
            <span>/</span>
            <span className="text-white">Panduan Keanggotaan</span>
          </nav>

          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
              Membership Guide
            </p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Informasi Keanggotaan Mahasiswa dan Alumni
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
              Halaman ini merangkum prosedur registrasi, perpanjangan, dan aktivasi akun jobseeker.
              Gunakan sebagai referensi sebelum mengirim formulir agar proses verifikasi berjalan cepat.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/registrasi"
                className="rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-gray-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-100"
              >
                Kembali ke Registrasi
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-20 mx-auto mt-6 max-w-6xl space-y-6 px-4 pb-24 sm:px-6">
        <GuideSection
          title="Informasi Keanggotaan"
          description="Pilih kategori yang sesuai agar alur verifikasi dan biaya keanggotaan tepat."
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {MEMBERSHIP_TYPES.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-[rgba(var(--pg-primary-rgb),0.2)] bg-[rgba(var(--pg-primary-rgb),0.03)] p-5"
              >
                <h3 className="text-base font-bold text-gray-800">{item.title}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: currentTheme.primary }}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </GuideSection>

        <GuideSection
          title="A. Prosedur Pendaftaran Baru"
          description="Langkah minimum untuk akun baru agar dapat diproses oleh administrator."
        >
          <NumberedList items={NEW_REGISTRATION_STEPS} />
        </GuideSection>

        <GuideSection
          title="B. Perpanjangan Keanggotaan"
          description="Bagi akun expired, gunakan alur perpanjangan tanpa mengulang seluruh registrasi."
        >
          <NumberedList items={RENEWAL_STEPS} />
        </GuideSection>

        <GuideSection
          title="C. Aktivasi Akun"
          description="Perhatikan estimasi waktu aktivasi dan kanal bantuan jika ada kendala."
        >
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <NumberedList items={ACTIVATION_NOTES} />
            </div>

            <div className="rounded-xl border border-[rgba(var(--pg-primary-rgb),0.22)] bg-[rgba(var(--pg-primary-rgb),0.05)] px-5 pb-5 pt-3 lg:-mt-8">
              <h3 className="text-sm font-bold uppercase tracking-wide text-gray-700">Kontak Resmi</h3>
              <div className="mt-3 space-y-3 text-sm text-gray-700">
                {CONTACTS.map((contact) => (
                  <div key={contact.label}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {contact.label}
                    </p>
                    <p className="mt-0.5 font-semibold text-gray-800">{contact.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GuideSection>
      </main>

      <Footer />
    </div>
  );
}
