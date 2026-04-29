export interface KewirausahaanItem {
  id: number;
  title: string;
  category: string;
  level: string; // Internasional, Nasional, Provinsi, Daerah, Kampus/instansi
  participantType: string; // 1 Peserta, 2-3 Peserta, Lebih dari 3 Peserta
  method: string; // Offline, Online, Hybrid
  status: string; // Buka, Segera, Tutup
  schedule: string; // e.g., "15 - 20 Mei 2026"
  quota: string; // e.g., "Sisa 20 slot" or "100 Tim"
  fee: string; // "Gratis" or "Rp 50.000"
  description: string;
  image: string;
  slug: string;
  uploadedAt: string; // e.g., "10 hari yang lalu"
  featured?: boolean;
  content: string[];
}

export const KEWIRAUSAHAAN_CATEGORIES = [
  "Semua Kategori",
  "Bisnis Plan",
  "Startup Pitch",
  "Inovasi Teknologi",
  "Desain Produk",
  "Marketing",
];

export const KEWIRAUSAHAAN_LEVELS = [
  "Semua Kategori",
  "Internasional",
  "Nasional",
  "Provinsi",
  "Daerah",
  "Kampus/instansi"
];

export const KEWIRAUSAHAAN_PARTICIPANTS = [
  "Semua Kategori",
  "Lebih dari 3 Peserta",
  "2-3 Peserta",
  "1 Peserta"
];

export const kewirausahaanData: KewirausahaanItem[] = [
  {
    id: 10,
    title: "PMW 2025",
    category: "Bisnis Plan",
    level: "Kampus/instansi",
    participantType: "2-3 Peserta",
    method: "Online",
    status: "Buka",
    schedule: "10 Jun 2025 - 27 Jun 2025",
    quota: "Terbuka",
    fee: "Gratis",
    description: "🚀 PROGRAM MAHASISWA WIRAUSAHA 2025. \"Future Makers: Menjadi Pelopor Bisnis Masa Depan\". Saatnya kamu wujudkan ide bisnis inovatifmu!",
    image: "PMW 2025.png",
    slug: "pmw-2025",
    uploadedAt: "Baru saja",
    featured: true,
    content: [
      "🚀 PROGRAM MAHASISWA WIRAUSAHA 2025\n\"Future Makers: Menjadi Pelopor Bisnis Masa Depan\"",
      "✨ Saatnya kamu wujudkan ide bisnis inovatifmu!\n📌 Pengumpulan Proposal: 10 - 24 Juni 2025\n📢 Pengumuman Penerima Hibah: 27 Juni 2025",
      "💼 Bidang usaha yang bisa kamu pilih:\nF&B, Budidaya, Jasa & Perdagangan, Industri Kreatif, Manufaktur, dan Bisnis Digital!",
      "📲 Scan QR Code atau klik link di bio untuk download panduan & daftar sekarang!",
      "📍 Info lengkap:\n🌐 upapkk.upnjatim.ac.id\n📧 upapkk@upnjatim.ac.id\n📸 @upapkk_upnvjt\n\n#PMW2025 #MahasiswaWirausaha #FutureMakers #BisnisMuda #UPNVJT #PMW #WirausahaMuda #EntrepreneurshipProgram"
    ],
  },
  {
    id: 1,
    title: "National Business Plan Competition 2026: Inovasi Ekonomi Hijau",
    category: "Bisnis Plan",
    level: "Nasional",
    participantType: "2-3 Peserta",
    method: "Offline",
    status: "Buka",
    schedule: "15 - 20 Mei 2026",
    quota: "Sisa 25 Tim",
    fee: "Rp 150.000",
    description: "Kompetisi rancangan bisnis tingkat nasional yang berfokus pada pengembangan ekonomi hijau dan keberlanjutan lingkungan. Kesempatan memenangkan total hadiah puluhan juta rupiah dan pendanaan awal.",
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&w=1200&q=80",
    slug: "national-business-plan-2026",
    uploadedAt: "3 hari yang lalu",
    featured: true,
    content: [
      "National Business Plan Competition (NBPC) 2026 kembali hadir dengan tema 'Inovasi Ekonomi Hijau untuk Masa Depan Berkelanjutan'. Kompetisi ini menantang mahasiswa dari seluruh Indonesia untuk merancang model bisnis yang mengedepankan aspek ekologi tanpa mengesampingkan profitabilitas.",
      "Peserta diharapkan dapat mempresentasikan ide bisnis yang solutif, inovatif, dan dapat diimplementasikan dalam skala nyata. Para finalis akan mendapatkan kesempatan pitching langsung di hadapan para investor dan praktisi industri.",
    ],
  },
  {
    id: 2,
    title: "Asean Startup Pitch Deck Challenge 2026",
    category: "Startup Pitch",
    level: "Internasional",
    participantType: "Lebih dari 3 Peserta",
    method: "Online",
    status: "Buka",
    schedule: "1 - 10 Juni 2026",
    quota: "Tidak Terbatas",
    fee: "Gratis",
    description: "Tantangan presentasi startup tingkat Asia Tenggara. Bawa ide startup Anda dan presentasikan di depan panel venture capital global. Terbuka untuk mahasiswa dan umum.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
    slug: "asean-startup-pitch-2026",
    uploadedAt: "1 minggu yang lalu",
    content: [
      "Apakah Anda memiliki startup di tahap early-stage atau ide yang siap direalisasikan? ASEAN Startup Pitch Deck Challenge adalah panggung yang tepat untuk Anda.",
      "Siapkan pitch deck terbaik Anda, tunjukkan traksi, analisis pasar yang tajam, dan strategi monetisasi yang masuk akal. Pemenang akan mendapatkan akses ke program inkubator eksklusif selama 3 bulan."
    ],
  },
  {
    id: 3,
    title: "Kompetisi Inovasi Teknologi Tepat Guna Jawa Timur",
    category: "Inovasi Teknologi",
    level: "Provinsi",
    participantType: "2-3 Peserta",
    method: "Offline",
    status: "Tutup",
    schedule: "10 April 2026",
    quota: "Penuh",
    fee: "Gratis",
    description: "Ajang unjuk gigi bagi para inovator muda di Jawa Timur untuk menciptakan teknologi tepat guna yang dapat membantu UMKM lokal.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    slug: "inovasi-teknologi-jatim-2026",
    uploadedAt: "2 bulan yang lalu",
    content: [
      "Teknologi tepat guna adalah kunci pemberdayaan ekonomi kerakyatan. Kami mencari alat, aplikasi, atau sistem yang bisa langsung diaplikasikan oleh UMKM dengan biaya terjangkau."
    ],
  },
  {
    id: 4,
    title: "UPN Campus Marketing Hackathon",
    category: "Marketing",
    level: "Kampus/instansi",
    participantType: "Lebih dari 3 Peserta",
    method: "Hybrid",
    status: "Segera",
    schedule: "20 - 22 Juli 2026",
    quota: "50 Tim",
    fee: "Rp 50.000",
    description: "Hackathon selama 48 jam khusus mahasiswa UPN Veteran Jatim untuk merumuskan strategi pemasaran digital bagi produk inovasi kampus.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    slug: "upn-marketing-hackathon",
    uploadedAt: "5 jam yang lalu",
    content: [
      "Bukan sekadar teori, hackathon ini mengharuskan Anda mengeksekusi kampanye pemasaran digital secara real-time. Tim terbaik akan melihat kampanyenya didanai secara penuh oleh kampus."
    ],
  },
  {
    id: 5,
    title: "UI/UX Product Design Competition: EduTech Solutions",
    category: "Desain Produk",
    level: "Nasional",
    participantType: "1 Peserta",
    method: "Online",
    status: "Buka",
    schedule: "1 - 30 Agustus 2026",
    quota: "Sisa 100 slot",
    fee: "Rp 75.000",
    description: "Kompetisi desain UI/UX individual dengan studi kasus merancang platform edukasi digital yang inklusif untuk daerah 3T.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    slug: "uiux-design-edutech",
    uploadedAt: "2 hari yang lalu",
    content: [
      "Tunjukkan empati dan skill desainmu! Rancang antarmuka pengguna yang ramah, mudah digunakan, dan memecahkan masalah akses pendidikan di daerah terluar Indonesia."
    ],
  },
  {
    id: 6,
    title: "Regional Student Entrepreneur Award",
    category: "Bisnis Plan",
    level: "Daerah",
    participantType: "1 Peserta",
    method: "Offline",
    status: "Buka",
    schedule: "15 September 2026",
    quota: "Sisa 15 slot",
    fee: "Gratis",
    description: "Penghargaan tahunan untuk mahasiswa wirausaha terbaik tingkat kota Surabaya. Tunjukkan pencapaian bisnismu selama satu tahun terakhir.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    slug: "surabaya-entrepreneur-award",
    uploadedAt: "3 minggu yang lalu",
    content: [
      "Ajang ini mencari sosok mahasiswa pengusaha yang tidak hanya berorientasi pada profit, tetapi juga memberdayakan masyarakat sekitar."
    ],
  },
  {
    id: 7,
    title: "Hackathon FinTech Syariah 2026",
    category: "Inovasi Teknologi",
    level: "Nasional",
    participantType: "Lebih dari 3 Peserta",
    method: "Online",
    status: "Segera",
    schedule: "10 - 12 Oktober 2026",
    quota: "30 Tim",
    fee: "Gratis",
    description: "Kembangkan prototipe aplikasi teknologi finansial (fintech) berbasis prinsip syariah dalam waktu 72 jam.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    slug: "hackathon-fintech-syariah",
    uploadedAt: "1 bulan yang lalu",
    content: [
      "Industri fintech syariah sedang berkembang pesat. Jadilah pionir dengan menciptakan solusi pembayaran, p2p lending, atau manajemen kekayaan yang sesuai syariat Islam."
    ],
  },
  {
    id: 8,
    title: "Lomba Desain Kemasan Produk UMKM Nusantara",
    category: "Desain Produk",
    level: "Nasional",
    participantType: "2-3 Peserta",
    method: "Offline",
    status: "Buka",
    schedule: "25 November 2026",
    quota: "Sisa 50 Tim",
    fee: "Rp 100.000",
    description: "Bantu UMKM naik kelas dengan merancang kemasan produk yang menarik, aman, dan ramah lingkungan.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
    slug: "desain-kemasan-umkm",
    uploadedAt: "4 hari yang lalu",
    content: [
      "Kemasan adalah tenaga penjual tak bersuara. Kami mencari desain kemasan inovatif yang mengangkat kearifan lokal sekaligus memiliki daya saing internasional."
    ],
  },
  {
    id: 9,
    title: "Global Social Venture Pitching",
    category: "Startup Pitch",
    level: "Internasional",
    participantType: "2-3 Peserta",
    method: "Hybrid",
    status: "Buka",
    schedule: "5 Desember 2026",
    quota: "Sisa 20 Tim",
    fee: "Gratis",
    description: "Kompetisi pitching tingkat dunia untuk startup dengan fokus memberikan dampak sosial yang terukur (Social Enterprise).",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    slug: "global-social-venture",
    uploadedAt: "2 hari yang lalu",
    content: [
      "Dunia membutuhkan solusi bisnis untuk masalah-masalah sosial. Bawa inovasi sosial Anda ke panggung global dan raih kesempatan pendanaan dari impact investor internasional."
    ],
  },
];
