import { useState } from "react";

const theme = {
  heroStart: "#5FBFBF",
  heroEnd: "#3B9C9C",
  primary: "#2F8F8F",
  primaryHover: "#3B9C9C",
  primarySoft: "#92D2D2",
  surface: "#F2FBFB",
  surfaceAlt: "#E3F4F4",
  surfaceStrong: "#D0ECEC",
  border: "#B9E2E2",
  text: "#1F6464",
  textMuted: "#4A8585",
  accent: "#D8F0F0",
  white: "#FFFFFF",
};

const programs = [
  {
    title: "Publikasi Lowongan Pekerjaan",
    description:
      "Menyebarkan informasi lowongan pekerjaan terkini kepada mahasiswa dan alumni agar dapat menemukan peluang karir yang sesuai.",
    icon: "📢",
  },
  {
    title: "Pembekalan Calon Wisuda",
    description:
      "Program persiapan bagi calon wisudawan untuk memasuki dunia kerja dengan bekal skill dan pengetahuan yang memadai.",
    icon: "🎓",
  },
  {
    title: "Campus Hiring",
    description:
      "Menghubungkan perusahaan dengan mahasiswa berbakat melalui rekrutmen langsung di kampus.",
    icon: "🏢",
  },
  {
    title: "Company Goes to Campus",
    description:
      "Menghadirkan perusahaan ternama ke kampus untuk memperkenalkan budaya kerja dan peluang karir.",
    icon: "🤝",
  },
  {
    title: "Pelatihan/Webinar Karir",
    description:
      "Menyelenggarakan pelatihan dan webinar pengembangan karir untuk meningkatkan kompetensi mahasiswa.",
    icon: "💡",
  },
  {
    title: "Konsultasi Karir dan Kewirausahaan",
    description:
      "Layanan konsultasi personal untuk membantu mahasiswa merancang jalur karir dan bisnis yang tepat.",
    icon: "🧭",
  },
  {
    title: "Penyelenggara Job Fair",
    description:
      "Mengadakan pameran karir skala besar yang mempertemukan pencari kerja dengan perusahaan-perusahaan terkemuka.",
    icon: "🎪",
  },
  {
    title: "Business Gathering",
    description:
      "Forum pertemuan antara mahasiswa wirausaha, alumni, dan pelaku bisnis untuk membangun jaringan dan kolaborasi.",
    icon: "🌐",
  },
  {
    title: "Kompetisi BMC",
    description:
      "Kompetisi Business Model Canvas bagi mahasiswa untuk mengasah kemampuan berpikir strategis dan inovatif.",
    icon: "🏆",
  },
  {
    title: "Program Mahasiswa Wirausaha (PMW)",
    description:
      "Program pendampingan dan pendanaan bagi mahasiswa yang ingin memulai dan mengembangkan usaha mereka.",
    icon: "🚀",
  },
  {
    title: "MBKM Kewirausahaan",
    description:
      "Program Merdeka Belajar Kampus Merdeka bidang kewirausahaan untuk pengalaman nyata di dunia bisnis.",
    icon: "📚",
  },
  {
    title: "Tracer Study",
    description:
      "Pelacakan dan evaluasi perkembangan karir alumni untuk meningkatkan kualitas lulusan di masa mendatang.",
    icon: "📊",
  },
  {
    title: "Survey Karir dan Kewirausahaan",
    description:
      "Penelitian berkala mengenai tren karir dan kewirausahaan untuk mendukung pengembangan program CDC.",
    icon: "📋",
  },
];

const CARDS_PER_PAGE = 3;

const Program_Kerja = () => {
  const [current, setCurrent] = useState(0);
  const totalPages = Math.ceil(programs.length / CARDS_PER_PAGE);

  const prev = () => setCurrent((p) => (p === 0 ? totalPages - 1 : p - 1));
  const next = () => setCurrent((p) => (p === totalPages - 1 ? 0 : p + 1));

  const visible = programs.slice(
    current * CARDS_PER_PAGE,
    current * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  return (
    <section style={{ backgroundColor: theme.surface }} className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3" style={{ color: theme.text }}>
            Program Kerja{" "}
            <span style={{ color: theme.primary }}>CDC UPNVJT</span>
          </h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: theme.textMuted }}>
            Berbagai program unggulan kami dirancang untuk mendukung pengembangan
            karir dan kewirausahaan mahasiswa serta alumni.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-30">
            {visible.map((program, index) => (
              <div
                key={current * CARDS_PER_PAGE + index}
                className="rounded-2xl p-6 flex flex-col gap-4 shadow-sm transition-all duration-300"
                style={{
                  backgroundColor: theme.white,
                  border: `1px solid ${theme.border}`,
                }}
              >
                {/* Content */}
                <div className="flex flex-col gap-2 flex-1">
                  <h3
                    className="font-semibold text-base leading-snug"
                    style={{ color: theme.text }}
                  >
                    {program.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                    {program.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            {/* Prev */}
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center shadow transition-all"
              style={{
                backgroundColor: theme.white,
                border: `1.5px solid ${theme.border}`,
                color: theme.primary,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = theme.primary;
                (e.currentTarget as HTMLButtonElement).style.color = theme.white;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = theme.white;
                (e.currentTarget as HTMLButtonElement).style.color = theme.primary;
              }}
            >
              ←
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "8px",
                    backgroundColor:
                      i === current ? theme.primary : theme.border,
                  }}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                backgroundColor: theme.white,
                border: `1.5px solid ${theme.border}`,
                color: theme.primary,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = theme.primary;
                (e.currentTarget as HTMLButtonElement).style.color = theme.white;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = theme.white;
                (e.currentTarget as HTMLButtonElement).style.color = theme.primary;
              }}
            >
              →
            </button>
          </div>

          {/* Page indicator */}
          <p className="text-center text-xs mt-3" style={{ color: theme.textMuted }}>
            {current + 1} / {totalPages}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Program_Kerja;