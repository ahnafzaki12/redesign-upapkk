export interface EventItem {
  id: number;
  title: string;
  category: string;
  type: "Offline" | "Online";
  date: string;
  description: string;
  image: string;
  href: string;
}

export const eventData: EventItem[] = [
  {
    id: 1,
    title: "Study Talk: Embracing Postgraduate Opportunities",
    category: "Seminar",
    type: "Offline",
    date: "19 November 2025",
    description:
      "Seminar interaktif membahas peluang dan strategi melanjutkan studi pascasarjana.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    href: "/karir/acara/study-talk-postgraduate",
  },
  {
    id: 2,
    title: "Integrated Career Days & Job Fair 2025",
    category: "Job Fair",
    type: "Offline",
    date: "6 Agustus 2025",
    description:
      "Event career fair dengan 22 perusahaan ternama dan seminar karier untuk mahasiswa dan alumni.",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
    href: "/karir/acara/career-days-2025",
  },
  {
    id: 3,
    title: "Career Seminar: Redefining Career for Impact",
    category: "Seminar",
    type: "Offline",
    date: "13 Mei 2025",
    description:
      "Seminar eksklusif mendefinisikan ulang karier dari passion menuju kontribusi nyata bagi masyarakat.",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
    href: "/karir/acara/career-seminar",
  },
  {
    id: 4,
    title: "Open Recruitment Pengurus DPP IKA UII Periode 2025-2030",
    category: "Rekrutmen",
    type: "Online",
    date: "21 Februari 2025",
    description:
      "Kesempatan bergabung menjadi pengurus Dewan Pengurus Pusat Ikatan Alumni UII periode 2025-2030.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    href: "/karir/acara/open-recruitment-ika",
  },
  {
    id: 5,
    title: "Rekrutmen Career Buddy DPKA UII",
    category: "Rekrutmen",
    type: "Online",
    date: "18 Februari 2025",
    description:
      "Program rekrutmen Career Buddy untuk membantu mahasiswa dalam persiapan karier dan pengembangan profesional.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    href: "/karir/acara/career-buddy",
  },
  {
    id: 6,
    title: "Workshop: Building Your Personal Brand",
    category: "Workshop",
    type: "Offline",
    date: "15 Maret 2026",
    description:
      "Workshop interaktif untuk membangun personal branding yang kuat di era digital.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    href: "/karir/acara/workshop-personal-brand",
  },
];
