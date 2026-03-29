export interface ArticleItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  href: string;
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
  },
];
