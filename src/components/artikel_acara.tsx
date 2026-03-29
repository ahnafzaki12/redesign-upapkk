import { useState } from "react";
import { Link } from "react-router-dom";
import { articleData } from "../data/articles";
import { eventData } from "../data/events";
import { pastelGreen } from "../theme/pastel_green";

interface ContentItem {
  id: number;
  date: string;
  title: string;
  image?: string;
  href: string;
  category?: string;
}

const latestArtikelData: ContentItem[] = [...articleData]
  .sort((a, b) => b.id - a.id)
  .slice(0, 5)
  .map((item) => ({
    id: item.id,
    date: item.date,
    title: item.title,
    image: item.image,
    href: item.href,
  }));

const latestAcaraData: ContentItem[] = [...eventData]
  .sort((a, b) => b.id - a.id)
  .slice(0, 5)
  .map((item) => ({
    id: item.id,
    date: item.date,
    title: item.title,
    image: item.image,
    href: item.href,
    category: item.category,
  }));

const thumbPalette = [
  { bg: pastelGreen.surfaceAlt, color: pastelGreen.primary },
  { bg: pastelGreen.surfaceStrong, color: pastelGreen.primaryHover },
  { bg: pastelGreen.surface, color: pastelGreen.textMuted },
  { bg: pastelGreen.accent, color: pastelGreen.primary },
  { bg: "#CFEAD4", color: pastelGreen.primary },
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
      className="shrink-0 rounded-xl flex items-center justify-center"
      style={{ width: 66, height: 52, background: p.bg, color: p.color }}
    >
      {type === "artikel" ? <IconArtikel /> : <IconAcara />}
    </div>
  );
}

function ContentCard({ item, index, type }: { item: ContentItem; index: number; type: "artikel" | "acara" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <li style={{ borderBottom: `1px solid ${pastelGreen.surfaceAlt}` }}>
      <Link
        to={item.href}
        className="flex gap-3 py-3 px-2 -mx-2 rounded-xl transition-all duration-200 cursor-pointer"
        style={{
          background: hovered ? pastelGreen.accent : "transparent",
          transform: hovered ? "translateX(3px)" : "translateX(0px)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {item.image ? (
          <img src={item.image} alt={item.title} className="shrink-0 rounded-xl object-cover" style={{ width: 66, height: 52 }} />
        ) : (
          <Thumbnail index={index} type={type} />
        )}

        <div className="flex flex-col justify-center gap-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium tracking-wide" style={{ color: pastelGreen.textMuted }}>
              {item.date}
            </span>
            {type === "acara" && item.category && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: pastelGreen.surfaceStrong, color: pastelGreen.primary }}
              >
                {item.category}
              </span>
            )}
          </div>
          <span
            className="text-sm font-semibold leading-snug line-clamp-2 transition-colors duration-200"
            style={{ color: pastelGreen.text }}
          >
            {item.title}
          </span>
        </div>

        <div
          className="shrink-0 self-center transition-all duration-200 mr-2"
          style={{
            color: pastelGreen.primaryHover,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(-2px)" : "translateX(-10px)",
          }}
        >
          <IconArrow />
        </div>
      </Link>
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
        border: `1px solid ${pastelGreen.border}`,
        background: pastelGreen.white,
        boxShadow: "0 2px 20px rgba(43, 92, 56, 0.08)",
      }}
    >
      {/* Panel header */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ background: pastelGreen.surface, borderBottom: `1px solid ${pastelGreen.border}` }}
      >
        <div
          className="flex items-center justify-center w-9 h-9 rounded-xl"
          style={{ background: pastelGreen.surfaceAlt, color: pastelGreen.primaryHover }}
        >
          {type === "artikel" ? <IconArtikel size={18} /> : <IconAcara size={18} />}
        </div>
        <h2 className="text-base font-bold tracking-tight" style={{ color: pastelGreen.text }}>
          {title}
        </h2>
        <div className="flex-1 h-px" style={{ background: pastelGreen.primarySoft }} />
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
      <div className="px-5 pb-5 pt-3" style={{ borderTop: `1px solid ${pastelGreen.border}` }}>
        <Link
          to={href}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
          style={{
            background: btnHover ? pastelGreen.primaryHover : pastelGreen.primary,
            color: pastelGreen.white,
            boxShadow: btnHover ? "0 4px 12px rgba(43, 92, 56, 0.3)" : "none",
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          {btnLabel}
          <span style={{ transition: "transform 0.2s", transform: btnHover ? "translateX(3px)" : "translateX(0)" }}>
            <IconArrow />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function ArtikelAcara() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionPanel title="Artikel" data={latestArtikelData} type="artikel" href="/artikel" btnLabel="Lihat Semua Artikel" />
        <SectionPanel title="Acara" data={latestAcaraData} type="acara" href="/karir/acara" btnLabel="Lihat Semua Acara" />
      </div>
    </section>
  );
}

