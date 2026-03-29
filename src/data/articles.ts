export interface ArticleItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  href: string;
  slug: string;
  author: string;
  readTime: string;
  content: string[];
  tags: string[];
}

export const articleData: ArticleItem[] = [
  {
    id: 1,
    title: "Takut Dewasa, Tapi Tetap Melangkah",
    date: "20 Februari 2026",
    description:
      "Artikel inspiratif tentang bagaimana menghadapi ketakutan saat memasuki fase dewasa dengan penuh tanggung jawab.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    href: "/artikel/takut-dewasa",
    slug: "takut-dewasa",
    author: "Dr. Ahmad Hidayat",
    readTime: "5 menit",
    tags: ["Motivasi", "Karir", "Inspirasi"],
    content: [
      "Transisi dari remaja menuju dewasa seringkali menjadi fase yang penuh dengan keraguan dan ketakutan. Banyak dari kita merasa tidak siap menghadapi tanggung jawab yang lebih besar, tekanan sosial yang meningkat, dan ekspektasi yang terus bertambah.",
      "Ketakutan untuk dewasa adalah hal yang sangat wajar. Namun, yang membedakan adalah bagaimana kita merespons ketakutan tersebut. Apakah kita membiarkannya melumpuhkan langkah kita, atau justru menggunakannya sebagai motivasi untuk terus berkembang?",
      "Dalam perjalanan menuju kedewasaan, kita perlu memahami bahwa tidak ada yang benar-benar siap 100%. Semua orang belajar sambil berjalan. Yang terpenting adalah keberanian untuk tetap melangkah meskipun dengan rasa takut yang menyertai.",
      "Beberapa strategi yang bisa membantu kita menghadapi fase ini antara lain: membangun support system yang solid, terus belajar dari pengalaman, tidak takut untuk meminta bantuan ketika diperlukan, dan yang terpenting adalah memberikan waktu untuk diri sendiri beradaptasi dengan perubahan.",
      "Ingatlah bahwa setiap langkah kecil yang kita ambil hari ini adalah investasi untuk masa depan yang lebih baik. Takut dewasa itu manusiawi, tetapi tetap melangkah itulah yang membuat kita tumbuh menjadi versi terbaik dari diri kita."
    ]
  },
  {
    id: 2,
    title: "Garis Start Kehidupan dan Tanggung Jawab Nilai",
    date: "12 Februari 2026",
    description:
      "Memahami pentingnya nilai dan tanggung jawab dalam memulai perjalanan karir profesional.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    href: "/artikel/garis-start-kehidupan",
    slug: "garis-start-kehidupan",
    author: "Prof. Siti Nurjanah",
    readTime: "6 menit",
    tags: ["Profesionalisme", "Nilai", "Tanggung Jawab"],
    content: [
      "Setiap perjalanan dimulai dengan satu langkah pertama. Dalam konteks kehidupan profesional, garis start ini bukan hanya tentang mendapatkan pekerjaan pertama, tetapi lebih tentang memahami nilai-nilai yang akan menjadi fondasi karir kita.",
      "Nilai adalah kompas yang mengarahkan setiap keputusan kita. Ketika kita memiliki nilai yang jelas—seperti integritas, kejujuran, dan dedikasi—maka setiap pilihan yang kita ambil akan lebih mudah dan lebih bermakna.",
      "Tanggung jawab bukan hanya tentang menyelesaikan tugas, tetapi tentang memberikan dampak positif dalam setiap pekerjaan yang kita lakukan. Ini tentang memahami bahwa setiap tindakan kita memiliki konsekuensi, baik untuk diri sendiri maupun orang lain.",
      "Di garis start kehidupan profesional, kita perlu menetapkan standar untuk diri sendiri. Standar ini akan menjadi acuan ketika kita menghadapi dilema etika, tekanan untuk berkompromi, atau godaan untuk mengambil jalan pintas.",
      "Memulai dengan fondasi nilai yang kuat akan membuat perjalanan karir kita tidak hanya sukses secara materi, tetapi juga bermakna dan memberikan kepuasan batin yang mendalam."
    ]
  },
  {
    id: 3,
    title: "Kesabaran, Nilai, dan Jalan Panjang Kehidupan",
    date: "12 Februari 2026",
    description:
      "Refleksi mendalam tentang pentingnya kesabaran dalam menjalani perjalanan panjang kehidupan secara konsisten.",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
    href: "/artikel/kesabaran-nilai",
    slug: "kesabaran-nilai",
    author: "Drs. Bambang Sutrisno",
    readTime: "7 menit",
    tags: ["Kesabaran", "Mindfulness", "Pengembangan Diri"],
    content: [
      "Di era yang serba cepat ini, kesabaran seringkali dianggap sebagai kelemahan. Namun, kenyataannya, kesabaran adalah salah satu kekuatan terbesar yang bisa kita miliki dalam menjalani perjalanan panjang kehidupan.",
      "Kesabaran bukan berarti pasif atau menerima segala sesuatu begitu saja. Kesabaran adalah tentang memahami bahwa proses itu penting, bahwa pertumbuhan membutuhkan waktu, dan bahwa hasil yang bermakna seringkali datang dari usaha yang konsisten dan berkelanjutan.",
      "Nilai-nilai yang kita pegang akan diuji berkali-kali dalam perjalanan hidup. Akan ada saat-saat di mana kita tergoda untuk menyerah, mengambil jalan pintas, atau mengompromikan prinsip kita demi hasil yang instan.",
      "Di sinilah kesabaran berperan penting. Dengan kesabaran, kita bisa tetap setia pada nilai-nilai kita meskipun hasilnya tidak langsung terlihat. Kita bisa terus melangkah dengan konsisten, bahkan ketika orang lain mungkin sudah menyerah.",
      "Perjalanan panjang kehidupan bukanlah sprint, melainkan maraton. Dan dalam maraton, yang menang bukanlah yang paling cepat di awal, tetapi yang paling konsisten dan sabar dalam menjaga ritme mereka hingga garis finish."
    ]
  },
  {
    id: 4,
    title: "Karakter Penuntun di Tengah Ujian Kepemimpinan",
    date: "28 Januari 2026",
    description:
      "Pembahasan nilai kepemimpinan yang membentuk karakter tangguh saat menghadapi tekanan dan tantangan kerja.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    href: "/artikel/karakter-penuntun",
    slug: "karakter-penuntun",
    author: "Dr. Rina Kusuma",
    readTime: "8 menit",
    tags: ["Leadership", "Karakter", "Manajemen"],
    content: [
      "Kepemimpinan sejati diuji bukan saat segala sesuatu berjalan lancar, tetapi ketika tekanan meningkat, tantangan menghadang, dan setiap keputusan memiliki konsekuensi yang signifikan.",
      "Karakter seorang pemimpin terbentuk dari nilai-nilai yang dipegang teguh bahkan di tengah badai. Integritas, kejujuran, empati, dan keberanian untuk mengambil keputusan sulit adalah fondasi dari kepemimpinan yang efektif.",
      "Dalam menghadapi ujian kepemimpinan, kita seringkali dihadapkan pada pilihan antara yang mudah dan yang benar. Pemimpin sejati akan memilih yang benar, meskipun itu berarti menghadapi risiko dan kritik.",
      "Karakter yang kuat juga berarti memiliki kerendahan hati untuk mengakui kesalahan, keberanian untuk belajar dari kegagalan, dan kebijaksanaan untuk mendengarkan perspektif orang lain sebelum mengambil keputusan.",
      "Ujian kepemimpinan adalah kesempatan untuk tumbuh. Setiap tantangan yang kita hadapi dan atasi akan memperkuat karakter kita dan membuat kita menjadi pemimpin yang lebih baik, lebih bijaksana, dan lebih dipercaya oleh tim kita."
    ]
  },
  {
    id: 5,
    title: "Ilmu sebagai Amanah dan Teladan sebagai Jalan Pengabdian",
    date: "28 Januari 2026",
    description:
      "Menempatkan ilmu sebagai amanah dan menjadikan teladan sebagai fondasi kontribusi nyata untuk masyarakat.",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80",
    href: "/artikel/ilmu-amanah",
    slug: "ilmu-amanah",
    author: "Prof. Dr. Hendra Wijaya",
    readTime: "6 menit",
    tags: ["Pendidikan", "Ilmu", "Pengabdian"],
    content: [
      "Ilmu pengetahuan adalah amanah yang diberikan kepada kita untuk digunakan demi kebaikan bersama. Bukan untuk disimpan atau digunakan hanya untuk kepentingan pribadi, tetapi untuk dibagikan dan dimanfaatkan untuk kemajuan masyarakat.",
      "Memiliki ilmu tanpa mengamalkannya sama dengan memiliki harta karun yang tidak pernah digunakan. Ilmu baru memiliki nilai ketika diterapkan, dibagikan, dan memberikan manfaat nyata bagi orang lain.",
      "Teladan adalah cara paling efektif untuk mengajarkan nilai-nilai. Bukan melalui kata-kata semata, tetapi melalui tindakan nyata yang konsisten dengan apa yang kita ajarkan. Orang akan lebih percaya pada apa yang kita lakukan daripada apa yang kita katakan.",
      "Pengabdian melalui ilmu dan teladan berarti hidup dengan integritas, di mana tidak ada perbedaan antara apa yang kita ajarkan dan apa yang kita praktikkan. Ini adalah jalan yang menantang, tetapi memberikan kepuasan yang mendalam.",
      "Ketika kita menempatkan ilmu sebagai amanah dan teladan sebagai jalan pengabdian, kita tidak hanya berkontribusi pada masyarakat hari ini, tetapi juga menanamkan benih untuk generasi yang lebih baik di masa depan."
    ]
  },
  {
    id: 6,
    title: "Menyusun Prioritas Hidup di Tengah Perubahan Zaman",
    date: "10 Januari 2026",
    description:
      "Panduan praktis menentukan prioritas hidup agar tetap fokus pada tujuan pribadi dan profesional.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    href: "/artikel/menyusun-prioritas-hidup",
    slug: "menyusun-prioritas-hidup",
    author: "Ir. Maya Anggraini, M.M.",
    readTime: "5 menit",
    tags: ["Produktivitas", "Manajemen Waktu", "Goals"],
    content: [
      "Perubahan zaman yang begitu cepat seringkali membuat kita kehilangan fokus. Banyaknya pilihan, distraksi, dan tuntutan dari berbagai arah membuat kita merasa kewalahan dan tidak tahu harus memprioritaskan apa.",
      "Menyusun prioritas hidup dimulai dengan memahami nilai-nilai inti kita. Apa yang benar-benar penting bagi kita? Apa yang ingin kita capai dalam hidup ini? Jawaban atas pertanyaan-pertanyaan ini akan menjadi kompas kita dalam menentukan prioritas.",
      "Tidak semua hal yang mendesak adalah penting, dan tidak semua hal yang penting terlihat mendesak. Kita perlu belajar membedakan antara aktivitas yang benar-benar berkontribusi pada tujuan jangka panjang kita dengan aktivitas yang hanya memberikan kepuasan sesaat.",
      "Teknik seperti Eisenhower Matrix, time blocking, dan regular reflection dapat membantu kita untuk tetap fokus pada apa yang benar-benar penting. Namun, yang lebih penting adalah komitmen untuk konsisten menjalankan prioritas yang telah kita tetapkan.",
      "Di tengah perubahan zaman yang terus berlangsung, kemampuan untuk menyusun dan menjaga prioritas hidup adalah keterampilan yang akan menentukan apakah kita hanya bereaksi terhadap keadaan atau secara proaktif membentuk masa depan kita sendiri."
    ]
  },
];
