import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { eventData } from "../data/events";
import type { EventItem } from "../data/events";
import { currentTheme } from "../theme/theme";

const ACCENT = currentTheme.primary;
const ACCENT_DARK = currentTheme.heroEnd;
const ACCENT_LIGHT = currentTheme.surfaceAlt;
const SURFACE = currentTheme.surface;

interface ToastProps {
  message: string;
  visible: boolean;
}

const Toast = ({ message, visible }: ToastProps) => {
  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 sm:px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-xl z-50 animate-fade-in-up"
      style={{ background: "rgba(17, 24, 39, 0.95)" }}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
};

function PosterFrame({ image, title, compact = false }: { image: string; title: string; compact?: boolean }) {
  const maxImageStyle = compact
    ? { maxWidth: "190px", maxHeight: "250px" }
    : { maxWidth: "420px", maxHeight: "640px" };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-white/50 ${
        compact ? "h-56" : "h-105 sm:h-125 lg:h-155"
      }`}
    >
      <div className="relative h-full w-full flex items-center justify-center p-2 sm:p-3">
        <img
          src={image}
          alt={title}
          className="w-auto h-auto max-w-full max-h-full rounded-xl object-contain shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
          style={maxImageStyle}
          loading="lazy"
        />
      </div>
    </div>
  );
}

function EventInfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-0.5 py-3 border-b border-gray-100 last:border-none last:pb-0">
      <span className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">{label}</span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}

function AgendaItem({ item, index }: { item: EventItem["agenda"][number]; index: number }) {
  return (
    <div className="relative pl-11 pb-8 last:pb-0">
      <span className="absolute left-0 top-0 w-8 h-8 rounded-xl text-xs font-bold flex items-center justify-center text-white" style={{ background: ACCENT }}>
        {index + 1}
      </span>
      <span className="absolute left-3.5 top-9 w-px h-[calc(100%-18px)] bg-[rgba(var(--pg-primary-rgb),0.25)]" aria-hidden="true" />

      <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: ACCENT_DARK }}>
        {item.time}
      </p>
      <h4 className="text-base font-bold text-gray-900 mb-2 leading-snug">{item.title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
    </div>
  );
}

function SpeakerCard({ name, title, organization, image }: EventItem["speakers"][number]) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3.5">
        {image ? (
          <img src={image} alt={name} className="w-11 h-11 rounded-xl object-cover bg-gray-100" />
        ) : (
          <div
            className="w-11 h-11 rounded-xl text-white font-bold flex items-center justify-center"
            style={{ background: `linear-gradient(140deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)` }}
          >
            {initial}
          </div>
        )}

        <div className="min-w-0">
          <h5 className="text-sm font-bold text-gray-900 leading-snug">{name}</h5>
          <p className="text-xs font-medium mt-0.5" style={{ color: ACCENT_DARK }}>
            {title}
          </p>
          <p className="text-xs text-gray-500 mt-1">{organization}</p>
        </div>
      </div>
    </div>
  );
}

function RelatedEventCard({ event }: { event: EventItem }) {
  return (
    <Link
      to={event.href}
      className="group rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      aria-label={`Baca detail acara ${event.title}`}
    >
      <PosterFrame image={event.image} title={event.title} compact />

      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: ACCENT_LIGHT, color: ACCENT_DARK }}>
            {event.category}
          </span>
          <span className="text-xs text-gray-500">{event.date}</span>
        </div>

        <h4 className="text-base font-bold text-gray-900 leading-snug line-clamp-2 mb-2.5">{event.title}</h4>
        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>

        <span className="inline-flex items-center gap-2 mt-4 text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200" style={{ color: ACCENT }}>
          Baca Selengkapnya
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const event = useMemo(() => eventData.find((item) => item.slug === slug) ?? null, [slug]);

  const relatedEvents = useMemo(() => {
    if (!event) return [];

    return eventData
      .filter((item) => item.id !== event.id)
      .sort((a, b) => {
        const aMatch = a.category === event.category ? 1 : 0;
        const bMatch = b.category === event.category ? 1 : 0;
        if (aMatch !== bMatch) return bMatch - aMatch;
        return b.id - a.id;
      })
      .slice(0, 3);
  }, [event]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 2200);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link acara berhasil disalin");
    } catch {
      showToast("Gagal menyalin link acara");
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        <main className="flex-1 pt-24 pb-14 px-4 sm:px-6 flex items-center">
          <div className="max-w-lg mx-auto text-center bg-white border border-gray-100 rounded-3xl p-7 sm:p-9 shadow-lg">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: ACCENT_LIGHT, color: ACCENT_DARK }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path d="M9.5 9.5h.01M14.5 9.5h.01M8.5 15c1 .95 2.1 1.45 3.5 1.45S14.5 15.95 15.5 15" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Acara tidak ditemukan</h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
              Detail acara yang Anda cari mungkin tidak tersedia atau sudah dipindahkan.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Kembali
              </button>
              <Link
                to="/karir/acara"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity"
                style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)` }}
              >
                Lihat Semua Acara
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(180deg, ${SURFACE} 0%, #ffffff 42%)` }}>
      <Navbar />

      <section
        className="pt-16 sm:pt-18 pb-16 sm:pb-20 px-4 sm:px-6"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.heroStart} 0%, ${currentTheme.heroEnd} 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm mb-6" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">
              Beranda
            </Link>
            <span className="text-white/45">/</span>
            <Link to="/karir/acara" className="text-white/70 hover:text-white transition-colors">
              Acara
            </Link>
            <span className="text-white/45">/</span>
            <span className="text-white/95 font-semibold truncate max-w-52 sm:max-w-80" aria-current="page" title={event.title}>
              {event.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 xl:gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center flex-wrap gap-2 mb-4">
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/22 text-white border border-white/40 tracking-wide uppercase">
                  {event.category}
                </span>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-black/12 text-white border border-white/20 uppercase">
                  {event.type}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
                {event.title}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-white/85 leading-relaxed max-w-2xl mb-6">
                {event.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-w-2xl mb-6">
                <div className="rounded-xl px-3.5 py-3 bg-white/14 border border-white/25 backdrop-blur-sm">
                  <p className="text-[11px] uppercase tracking-wide text-white/70 font-semibold">Tanggal</p>
                  <p className="text-sm font-semibold text-white mt-1">{event.date}</p>
                </div>
                <div className="rounded-xl px-3.5 py-3 bg-white/14 border border-white/25 backdrop-blur-sm">
                  <p className="text-[11px] uppercase tracking-wide text-white/70 font-semibold">Waktu</p>
                  <p className="text-sm font-semibold text-white mt-1">{event.time}</p>
                </div>
                <div className="sm:col-span-2 rounded-xl px-3.5 py-3 bg-white/14 border border-white/25 backdrop-blur-sm">
                  <p className="text-[11px] uppercase tracking-wide text-white/70 font-semibold">Lokasi</p>
                  <p className="text-sm font-semibold text-white mt-1">{event.location}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {event.registrationLink ? (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm sm:text-base text-(--pg-primary) bg-white hover:bg-white/90 transition-colors"
                  >
                    Daftar Sekarang
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm sm:text-base bg-white/25 text-white/80 border border-white/35 cursor-not-allowed"
                  >
                    Pendaftaran Belum Dibuka
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm sm:text-base text-white border border-white/35 bg-white/8 hover:bg-white/18 transition-colors"
                >
                  Salin Link Acara
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1">
                    <path d="M10 14a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07L11.4 5.52" />
                    <path d="M14 10a5 5 0 00-7.07 0L4.1 12.83a5 5 0 107.07 7.07L12.6 18.5" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 animate-fade-in-scale">
              <PosterFrame image={event.image} title={event.title} />
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-20 -mt-10 sm:-mt-12 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <section className="bg-white rounded-3xl border border-gray-100 shadow-[0_18px_40px_rgba(12,24,40,0.06)] p-6 sm:p-7">
              <p className="text-xs uppercase tracking-[0.2em] mb-2 font-semibold" style={{ color: ACCENT_DARK }}>
                Tentang Acara
              </p>
              <h2 className="text-2xl sm:text-[30px] font-bold text-gray-900 leading-tight mb-4">Overview</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{event.overview}</p>
            </section>

            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-7">
              <p className="text-xs uppercase tracking-[0.2em] mb-2 font-semibold" style={{ color: ACCENT_DARK }}>
                Value Utama
              </p>
              <h2 className="text-2xl sm:text-[30px] font-bold text-gray-900 leading-tight mb-5">Yang Akan Anda Dapatkan</h2>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                {event.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-2xl px-4 py-3.5 border border-gray-100 flex items-start gap-3"
                    style={{ background: `linear-gradient(160deg, #ffffff 0%, ${SURFACE} 100%)` }}
                  >
                    <span
                      className="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center mt-0.5"
                      style={{ background: ACCENT_LIGHT }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="3">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm sm:text-[15px] font-medium text-gray-700 leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-7">
              <p className="text-xs uppercase tracking-[0.2em] mb-2 font-semibold" style={{ color: ACCENT_DARK }}>
                Rangkaian Sesi
              </p>
              <h2 className="text-2xl sm:text-[30px] font-bold text-gray-900 leading-tight mb-6">Agenda Acara</h2>

              <div>
                {event.agenda.map((agendaItem, index) => (
                  <AgendaItem key={`${agendaItem.time}-${agendaItem.title}`} item={agendaItem} index={index} />
                ))}
              </div>
            </section>

            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-7">
              <p className="text-xs uppercase tracking-[0.2em] mb-2 font-semibold" style={{ color: ACCENT_DARK }}>
                Narasumber
              </p>
              <h2 className="text-2xl sm:text-[30px] font-bold text-gray-900 leading-tight mb-5">Speakers</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {event.speakers.map((speaker) => (
                  <SpeakerCard key={`${speaker.name}-${speaker.organization}`} {...speaker} />
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-22 lg:self-start">
            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6">
              <h3 className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">Informasi Acara</h3>
              <div>
                <EventInfoRow label="Penyelenggara" value={event.organizer} />
                <EventInfoRow label="Tanggal" value={event.date} />
                <EventInfoRow label="Waktu" value={event.time} />
                <EventInfoRow label="Lokasi" value={event.location} />
                <EventInfoRow label="Kapasitas" value={`${event.capacity} peserta`} />
              </div>
            </section>

            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6">
              <h3 className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-3">Tag</h3>
              <div className="flex flex-wrap gap-2.5">
                {event.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-full font-semibold" style={{ background: ACCENT_LIGHT, color: ACCENT_DARK }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </section>

            <section
              className="rounded-3xl p-5 sm:p-6 border border-transparent"
              style={{
                background: `linear-gradient(155deg, rgba(var(--pg-primary-rgb),0.12) 0%, rgba(var(--pg-primary-rgb),0.06) 70%, rgba(var(--pg-primary-rgb),0.16) 100%)`,
              }}
            >
              <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug mb-2">Siap ikut acara ini?</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Amankan kursi Anda sekarang dan dapatkan akses ke seluruh sesi acara.
              </p>

              {event.registrationLink ? (
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)` }}
                >
                  Daftar Sekarang
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full px-4 py-3 rounded-xl text-sm font-bold text-white/85 bg-gray-500 cursor-not-allowed"
                >
                  Pendaftaran Segera Hadir
                </button>
              )}

              <button
                type="button"
                onClick={() => navigate("/karir/acara")}
                className="w-full mt-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Kembali ke Daftar Acara
              </button>
            </section>
          </aside>
        </div>

        {relatedEvents.length > 0 && (
          <section className="max-w-7xl mx-auto mt-10 sm:mt-12">
            <div className="flex items-end justify-between gap-4 mb-5 sm:mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: ACCENT_DARK }}>
                  Eksplorasi Lainnya
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">Acara Terkait</h2>
              </div>

              <Link
                to="/karir/acara"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: ACCENT }}
              >
                Lihat Semua
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {relatedEvents.map((relatedEvent) => (
                <RelatedEventCard key={relatedEvent.id} event={relatedEvent} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <Toast message={toastMessage} visible={toastVisible} />
    </div>
  );
}