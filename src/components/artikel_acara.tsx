import { useState } from "react";

interface ContentItem {
  id: number;
  date: string;
  title: string;
  image?: string;
  href: string;
  category?: string;
}

const artikelData: ContentItem[] = [
  {
    id: 1,
    date: "20 Februari 2026",
    title: "Takut Dewasa, Tapi Tetap Melangkah",
    href: "/artikel/takut-dewasa",
    category: "Motivasi",
  },
  {
    id: 2,
    date: "12 Februari 2026",
    title: "Garis Start Kehidupan dan Tanggung Jawab Nilai",
    href: "/artikel/garis-start-kehidupan",
    category: "Karir",
  },
  {
    id: 3,
    date: "12 Februari 2026",
    title: "Kesabaran, Nilai, dan Jalan Panjang Kehidupan",
    href: "/artikel/kesabaran-nilai",
    category: "Inspirasi",
  },
  {
    id: 4,
    date: "28 Januari 2026",
    title: "Karakter Penuntun di Tengah Ujian Kepemimpinan",
    href: "/artikel/karakter-penuntun",
    category: "Kepemimpinan",
  },
  {
    id: 5,
    date: "28 Januari 2026",
    title: "Ilmu sebagai Amanah dan Teladan sebagai Jalan Pengabdian",
    href: "/artikel/ilmu-amanah",
    category: "Pendidikan",
  },
];

const acaraData: ContentItem[] = [
  {
    id: 1,
    date: "19 November 2025",
    title: "Study Talk: Embracing Postgraduate Opportunities",
    href: "/karir/acara/study-talk-postgraduate",
    category: "Seminar",
  },
  {
    id: 2,
    date: "6 Agustus 2025",
    title: "Integrated Career Days & Job Fair 2025: 22 Perusahaan & Seminar Karier",
    href: "/karir/acara/career-days-2025",
    category: "Job Fair",
  },
  {
    id: 3,
    date: "13 Mei 2025",
    title: "Career Seminar: Redefining Career for Impact — From Passion to Contribution",
    href: "/karir/acara/career-seminar",
    category: "Seminar",
  },
  {
    id: 4,
    date: "21 Februari 2025",
    title: "Open Recruitment Pengurus DPP IKA UII Periode 2025–2030",
    href: "/karir/acara/open-recruitment-ika",
    category: "Rekrutmen",
  },
  {
    id: 5,
    date: "18 Februari 2025",
    title: "Rekrutmen Career Buddy DPKA UII",
    href: "/karir/acara/career-buddy",
    category: "Rekrutmen",
  },
];

const thumbPalette = [
  { bg: "#dcfce7", color: "#16a34a" },
  { bg: "#d1fae5", color: "#059669" },
  { bg: "#ccfbf1", color: "#0f766e" },
  { bg: "#ecfccb", color: "#65a30d" },
  { bg: "#bbf7d0", color: "#15803d" },
];

const IconArtikel = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
    <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="8" y1="17" x2="13" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconAcara = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.8" />
    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <rect x="7" y="13" width="3.5" height="3.5" rx="0.5" fill="currentColor" opacity="0.8" />
  </svg>
);

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Thumbnail({ index, type }: { index: number; type: "artikel" | "acara" }) {
  const p = thumbPalette[index % thumbPalette.length];
  return (
    <div
      className="flex-shrink-0 rounded-xl flex items-center justify-center"
      style={{ width: 66, height: 52, background: p.bg, color: p.color }}
    >
      {type === "artikel" ? <IconArtikel /> : <IconAcara />}
    </div>
  );
}

function ContentCard({ item, index, type }: { item: ContentItem; index: number; type: "artikel" | "acara" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <li style={{ borderBottom: "1px solid #e8f5e9" }}>
      <a
        href={item.href}
        className="flex gap-3 py-3 px-2 -mx-2 rounded-xl transition-all duration-200 cursor-pointer"
        style={{
          background: hovered ? "#a8ddb0" : "transparent",
          transform: hovered ? "translateX(3px)" : "translateX(0px)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {item.image ? (
          <img src={item.image} alt={item.title} className="flex-shrink-0 rounded-xl object-cover" style={{ width: 66, height: 52 }} />
        ) : (
          <Thumbnail index={index} type={type} />
        )}

        <div className="flex flex-col justify-center gap-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium tracking-wide" style={{ color: "#3d6647" }}>
              {item.date}
            </span>
            {item.category && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "#d4f0da", color: "#2b5c38" }}
              >
                {item.category}
              </span>
            )}
          </div>
          <span
            className="text-sm font-semibold leading-snug line-clamp-2 transition-colors duration-200"
            style={{ color: hovered ? "#1a4a25" : "#1a4a25" }}
          >
            {item.title}
          </span>
        </div>

        <div
          className="flex-shrink-0 self-center transition-all duration-200"
          style={{
            color: "#3d7a4e",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-8px)",
          }}
        >
          <IconArrow />
        </div>
      </a>
    </li>
  );
}

function SectionPanel({
  title,
  data,
  type,
  href,
  btnLabel,
}: {
  title: string;
  data: ContentItem[];
  type: "artikel" | "acara";
  href: string;
  btnLabel: string;
}) {
  const [btnHover, setBtnHover] = useState(false);

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden transition-shadow duration-300"
      style={{
        border: "1px solid #c3e6c8",
        background: "#ffffff",
        boxShadow: "0 2px 20px rgba(43, 92, 56, 0.08)",
      }}
    >
      {/* Panel header */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ background: "#f4fbf5", borderBottom: "1px solid #c3e6c8" }}
      >
        <div
          className="flex items-center justify-center w-9 h-9 rounded-xl"
          style={{ background: "#e8f5e9", color: "#52975f" }}
        >
          {type === "artikel" ? <IconArtikel size={18} /> : <IconAcara size={18} />}
        </div>
        <h2 className="text-base font-bold tracking-tight" style={{ color: "#1a4a25" }}>
          {title}
        </h2>
        <div className="flex-1 h-px" style={{ background: "#72b87c" }} />
      </div>

      {/* List */}
      <div className="flex-1 px-5 pt-1 pb-2">
        <ul>
          {data.map((item, i) => (
            <ContentCard key={item.id} item={item} index={i} type={type} />
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 pt-3" style={{ borderTop: "1px solid #c3e6c8" }}>
        <a
          href={href}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
          style={{
            background: btnHover ? "#3d7a4e" : "#2b5c38",
            color: "#ffffff",
            boxShadow: btnHover ? "0 4px 12px rgba(43, 92, 56, 0.3)" : "none",
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          {btnLabel}
          <span style={{ transition: "transform 0.2s", transform: btnHover ? "translateX(3px)" : "translateX(0)" }}>
            <IconArrow />
          </span>
        </a>
      </div>
    </div>
  );
}

export default function ArtikelAcara() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionPanel title="Artikel" data={artikelData} type="artikel" href="/artikel" btnLabel="Lihat Semua Artikel" />
        <SectionPanel title="Acara" data={acaraData} type="acara" href="/karir/acara" btnLabel="Lihat Semua Acara" />
      </div>
    </section>
  );
}

