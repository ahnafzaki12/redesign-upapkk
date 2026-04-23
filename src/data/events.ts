export interface EventItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  type: "Offline" | "Online";
  date: string;
  time: string;
  location: string;
  organizer: string;
  capacity: number;
  description: string;
  overview: string;
  highlights: string[];
  agenda: EventAgendaItem[];
  speakers: EventSpeaker[];
  tags: string[];
  image: string;
  registrationLink?: string;
  href: string;
}

export interface EventSpeaker {
  name: string;
  title: string;
  organization: string;
  image?: string;
}

export interface EventAgendaItem {
  time: string;
  title: string;
  description: string;
}

type EventSeed = Omit<EventItem, "href">;

const eventSeeds: EventSeed[] = [
  {
    id: 1,
    slug: "study-talk-postgraduate",
    title: "Study Talk: Embracing Postgraduate Opportunities",
    category: "Seminar",
    type: "Offline",
    date: "19 November 2025",
    time: "09.00 - 12.30 WIB",
    location: "Auditorium Abdul Kahar Muzakkir, UII",
    organizer: "Direktorat Pengembangan Karier UII",
    capacity: 350,
    description:
      "Seminar interaktif membahas peluang dan strategi melanjutkan studi pascasarjana.",
    overview:
      "Study Talk ini dirancang untuk mahasiswa tingkat akhir dan alumni muda yang ingin memahami peta peluang studi pascasarjana. Sesi membahas strategi memilih program, persiapan dokumen, roadmap riset, sampai simulasi personal statement dengan pendekatan praktis.",
    highlights: [
      "Mini clinic penyusunan rencana studi lanjut",
      "Review cepat CV akademik oleh mentor",
      "Networking corner dengan alumni penerima beasiswa",
    ],
    agenda: [
      {
        time: "09.00",
        title: "Registrasi dan Coffee Networking",
        description: "Pembukaan area registrasi dan sesi perkenalan peserta.",
      },
      {
        time: "09.30",
        title: "Roadmap Studi Pascasarjana",
        description: "Membedah jalur S2/S3, pilihan kampus, dan proyeksi karier.",
      },
      {
        time: "10.45",
        title: "Workshop Personal Statement",
        description: "Latihan menyusun narasi akademik yang kuat dan autentik.",
      },
      {
        time: "11.45",
        title: "Panel Alumni dan Q&A",
        description: "Diskusi pengalaman nyata dari alumni penerima beasiswa.",
      },
    ],
    speakers: [
      {
        name: "Dr. Nadia Rizkia",
        title: "Head of Academic Pathways",
        organization: "UPAPKK UII",
      },
      {
        name: "Muhammad Fikri, M.Sc.",
        title: "Awardee LPDP 2024",
        organization: "University of Melbourne",
      },
    ],
    tags: ["Beasiswa", "S2/S3", "Personal Statement"],
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    registrationLink: "https://upapkk.uii.ac.id/daftar/study-talk-postgraduate",
  },
  {
    id: 2,
    slug: "career-days-2025",
    title: "Integrated Career Days & Job Fair 2025",
    category: "Job Fair",
    type: "Offline",
    date: "6 Agustus 2025",
    time: "08.30 - 16.00 WIB",
    location: "Gedung Olahraga UII, Sleman",
    organizer: "UPAPKK UII x Mitra Industri Nasional",
    capacity: 1200,
    description:
      "Event career fair dengan 22 perusahaan ternama dan seminar karier untuk mahasiswa dan alumni.",
    overview:
      "Integrated Career Days menghadirkan pameran rekrutmen, sesi konsultasi CV, mock interview, dan seminar karier lintas industri dalam satu hari penuh. Acara ini ditujukan untuk mempercepat transisi mahasiswa menuju dunia kerja profesional.",
    highlights: [
      "22 booth perusahaan nasional dan multinasional",
      "Sesi review CV 1-on-1 oleh HR partner",
      "Fast interview lane untuk kandidat terpilih",
    ],
    agenda: [
      {
        time: "08.30",
        title: "Opening Ceremony",
        description: "Pembukaan resmi dan pengenalan alur area job fair.",
      },
      {
        time: "09.00",
        title: "Company Expo",
        description: "Kunjungan booth dan sesi eksplorasi lowongan.",
      },
      {
        time: "11.00",
        title: "Career Clinic",
        description: "Review CV dan simulasi interview singkat.",
      },
      {
        time: "13.30",
        title: "Panel Industri 2025",
        description: "Tren rekrutmen dan skill prioritas lintas sektor.",
      },
      {
        time: "15.00",
        title: "Fast Interview Session",
        description: "Wawancara cepat untuk kandidat shortlist.",
      },
    ],
    speakers: [
      {
        name: "Siti Aulia Prameswari",
        title: "Senior Talent Acquisition",
        organization: "PT Astra International",
      },
      {
        name: "Rafli Dwi Ananta",
        title: "People Partner Lead",
        organization: "Telkom Indonesia",
      },
    ],
    tags: ["Job Fair", "CV Review", "Interview"],
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
    registrationLink: "https://upapkk.uii.ac.id/daftar/career-days-2025",
  },
  {
    id: 3,
    slug: "career-seminar",
    title: "Career Seminar: Redefining Career for Impact",
    category: "Seminar",
    type: "Offline",
    date: "13 Mei 2025",
    time: "13.00 - 16.00 WIB",
    location: "Convention Hall Fakultas Bisnis, UII",
    organizer: "UPAPKK UII",
    capacity: 500,
    description:
      "Seminar eksklusif mendefinisikan ulang karier dari passion menuju kontribusi nyata bagi masyarakat.",
    overview:
      "Seminar ini mengajak peserta merancang karier berdampak melalui kombinasi growth mindset, leadership, dan social contribution. Konten disusun dengan studi kasus nyata dari praktisi industri dan komunitas sosial.",
    highlights: [
      "Framework career impact plan 3 tahun",
      "Studi kasus transisi karier lintas bidang",
      "Sesi tanya jawab langsung dengan praktisi",
    ],
    agenda: [
      {
        time: "13.00",
        title: "Registrasi dan Welcoming Session",
        description: "Check-in peserta dan pengantar tema seminar.",
      },
      {
        time: "13.30",
        title: "Main Talk: Career with Impact",
        description: "Menyusun arah karier yang selaras nilai personal.",
      },
      {
        time: "14.45",
        title: "Panel Discussion",
        description: "Diskusi lintas sektor tentang tantangan dunia kerja.",
      },
      {
        time: "15.30",
        title: "Action Mapping Workshop",
        description: "Praktik menyusun peta aksi 90 hari setelah seminar.",
      },
    ],
    speakers: [
      {
        name: "Dimas Pratama",
        title: "Leadership Coach",
        organization: "ImpactLab Indonesia",
      },
      {
        name: "Rr. Nabila Putri",
        title: "Head of Employer Branding",
        organization: "Bank Syariah Indonesia",
      },
    ],
    tags: ["Leadership", "Career Growth", "Impact"],
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
    registrationLink: "https://upapkk.uii.ac.id/daftar/career-seminar",
  },
  {
    id: 4,
    slug: "open-recruitment-ika",
    title: "Open Recruitment Pengurus DPP IKA UII Periode 2025-2030",
    category: "Rekrutmen",
    type: "Online",
    date: "21 Februari 2025",
    time: "19.30 - 21.00 WIB",
    location: "Zoom Webinar + Live Q&A",
    organizer: "DPP IKA UII",
    capacity: 800,
    description:
      "Kesempatan bergabung menjadi pengurus Dewan Pengurus Pusat Ikatan Alumni UII periode 2025-2030.",
    overview:
      "Program open recruitment ini memberikan ruang kontribusi strategis bagi alumni UII untuk memperkuat jejaring, inovasi program, serta kolaborasi lintas angkatan. Peserta akan mendapatkan pemaparan peran, target kerja, dan mekanisme seleksi secara transparan.",
    highlights: [
      "Penjelasan struktur organisasi dan divisi",
      "Sesi orientasi kandidat pengurus",
      "Konsultasi peran sesuai minat kontribusi",
    ],
    agenda: [
      {
        time: "19.30",
        title: "Kickoff Session",
        description: "Pembukaan dan gambaran besar kepengurusan 2025-2030.",
      },
      {
        time: "19.50",
        title: "Pemaparan Divisi",
        description: "Penjelasan kebutuhan peran di tiap direktorat kerja.",
      },
      {
        time: "20.25",
        title: "Sharing Pengurus Aktif",
        description: "Praktik baik, tantangan, dan dampak program alumni.",
      },
      {
        time: "20.45",
        title: "Q&A dan Penutupan",
        description: "Tanya jawab teknis terkait pendaftaran dan seleksi.",
      },
    ],
    speakers: [
      {
        name: "Ir. Arif Wicaksono",
        title: "Ketua Umum",
        organization: "DPP IKA UII",
      },
      {
        name: "Dea Puspita Sari",
        title: "Sekretaris Program",
        organization: "DPP IKA UII",
      },
    ],
    tags: ["Organisasi", "Alumni", "Leadership"],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    registrationLink: "https://upapkk.uii.ac.id/daftar/open-recruitment-ika",
  },
  {
    id: 5,
    slug: "career-buddy",
    title: "Rekrutmen Career Buddy DPKA UII",
    category: "Rekrutmen",
    type: "Online",
    date: "18 Februari 2025",
    time: "15.30 - 17.00 WIB",
    location: "Google Meet",
    organizer: "DPKA UII",
    capacity: 300,
    description:
      "Program rekrutmen Career Buddy untuk membantu mahasiswa dalam persiapan karier dan pengembangan profesional.",
    overview:
      "Career Buddy adalah program pendampingan peer-to-peer untuk mahasiswa yang sedang menyiapkan karier awal. Pada sesi ini, peserta mengenal peran mentor, alur pendampingan, target capaian, dan timeline komitmen program.",
    highlights: [
      "Skema mentoring berbasis milestone",
      "Toolkit pendampingan karier mahasiswa",
      "Sesi simulasi coaching conversation",
    ],
    agenda: [
      {
        time: "15.30",
        title: "Program Orientation",
        description: "Pengenalan model pendampingan Career Buddy.",
      },
      {
        time: "16.00",
        title: "Role Simulation",
        description: "Praktik singkat simulasi mentoring antar peserta.",
      },
      {
        time: "16.30",
        title: "Open Forum",
        description: "Diskusi ekspektasi, komitmen waktu, dan evaluasi program.",
      },
    ],
    speakers: [
      {
        name: "Fitri Handayani",
        title: "Career Development Specialist",
        organization: "DPKA UII",
      },
      {
        name: "Ilham Ramadhan",
        title: "Program Mentor",
        organization: "Career Buddy Cohort 2024",
      },
    ],
    tags: ["Mentoring", "Coaching", "Career Preparation"],
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    registrationLink: "https://upapkk.uii.ac.id/daftar/career-buddy",
  },
  {
    id: 6,
    slug: "workshop-personal-brand",
    title: "Workshop: Building Your Personal Brand",
    category: "Workshop",
    type: "Offline",
    date: "15 Maret 2026",
    time: "09.00 - 15.00 WIB",
    location: "Creative Hub UII, Ruang Kolaborasi 2",
    organizer: "UPAPKK UII x Komunitas Kreator Jogja",
    capacity: 180,
    description:
      "Workshop interaktif untuk membangun personal branding yang kuat di era digital.",
    overview:
      "Workshop intensif ini membantu peserta merancang positioning profesional, membangun narasi personal brand, dan menyusun konten portofolio digital yang relevan dengan kebutuhan industri saat ini.",
    highlights: [
      "Brand positioning canvas untuk profil profesional",
      "Praktik audit LinkedIn dan portofolio digital",
      "Template konten 30 hari untuk personal visibility",
    ],
    agenda: [
      {
        time: "09.00",
        title: "Brand Discovery Session",
        description: "Menggali nilai unik, kekuatan, dan target audiens profesional.",
      },
      {
        time: "10.45",
        title: "Digital Presence Lab",
        description: "Audit profil digital dan penyusunan profil yang kredibel.",
      },
      {
        time: "13.00",
        title: "Content Sprint",
        description: "Menyusun kalender konten sederhana untuk 4 minggu.",
      },
      {
        time: "14.15",
        title: "Showcase and Feedback",
        description: "Presentasi hasil dan feedback langsung dari fasilitator.",
      },
    ],
    speakers: [
      {
        name: "Amanda Yustika",
        title: "Personal Branding Consultant",
        organization: "BrandFoundry",
      },
      {
        name: "Raka Aditya",
        title: "Content Strategist",
        organization: "Creator Studio ID",
      },
    ],
    tags: ["Personal Branding", "LinkedIn", "Portfolio"],
    image:
      "https://upapkk.upnjatim.ac.id/storage/event/MuohRwbrU7YB6LASGtb83NIKIfyFMKIqocb5NQGp.png",
    registrationLink: "https://upapkk.uii.ac.id/daftar/workshop-personal-brand",
  },
];

export const eventData: EventItem[] = eventSeeds.map((event) => ({
  ...event,
  href: `/karir/acara/${event.slug}`,
}));
