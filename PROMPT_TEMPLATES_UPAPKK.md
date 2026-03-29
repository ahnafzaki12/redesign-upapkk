# Prompt Siap Pakai - UPAPKK

File ini berisi prompt yang sudah diisi untuk project UPAPKK agar hemat request dan tetap menghasilkan output berkualitas.

## 1) Redesign Halaman Detail Artikel (Siap Kirim)

```text
Tujuan:
Saya ingin redesign halaman detail artikel agar terlihat premium, modern, informatif, dan tetap cepat.

Konteks:
Project: React + TypeScript + Vite
File utama: src/pages/article_detail_page.tsx
Komponen terkait yang mungkin relevan: src/components/navbar.tsx
Data artikel: src/data/articles.ts
Halaman terkait: src/pages/article_page.tsx
Target device: desktop + mobile
Jangan ubah: struktur data artikel, logic routing utama, API kontrak komponen lain.

Kriteria sukses:
1. Hero artikel kuat (judul, metadata, visual hierarchy jelas).
2. Tipografi nyaman dibaca untuk artikel panjang.
3. Layout responsif rapi di mobile dan desktop.
4. Accessibility baik (semantic heading, alt text, kontras, keyboard).
5. Kode bersih dan maintainable tanpa dependency tambahan kecuali benar-benar perlu.

Tugas:
1. Audit singkat masalah UI/UX halaman saat ini.
2. Rancang struktur visual baru yang lebih kuat.
3. Implementasi langsung di file terkait.
4. Jelaskan alasan desain/teknis secara ringkas.
5. Berikan checklist verifikasi final.

Output yang saya mau:
1. Perubahan final siap pakai.
2. Ringkasan before vs after.
3. Daftar file yang diubah.
4. Catatan risiko kecil jika ada.

Tambahan instruksi hemat request:
1. Kerjakan sekali jalan sampai final, jangan berhenti di rencana.
2. Hindari klarifikasi tambahan kecuali benar-benar blocker.
3. Prioritaskan perubahan paling berdampak.
4. Akhiri dengan checklist verifikasi singkat.
```

## 2) Redesign Halaman Daftar Artikel (Siap Kirim)

```text
Tujuan:
Tingkatkan halaman daftar artikel agar lebih modern, mudah dipindai, dan mendorong klik ke detail.

Konteks:
Project: React + TypeScript + Vite
File utama: src/pages/article_page.tsx
Data: src/data/articles.ts
Target: desktop + mobile
Jangan ubah: sumber data, alur navigasi ke detail.

Kriteria sukses:
1. Card/list artikel punya hierarchy yang jelas.
2. Pencarian/pengelompokan (jika ada) tetap intuitif.
3. Spacing, tipografi, dan CTA konsisten.
4. Performa render tetap ringan.

Tugas:
1. Audit UI saat ini.
2. Implementasi improvement paling impactful.
3. Rapikan struktur komponen jika perlu (tanpa over-engineering).
4. Sertakan verifikasi singkat.

Output:
1. Hasil final siap pakai.
2. Daftar file berubah.
3. Alasan perubahan utama.
```

## 3) Redesign Halaman Event (Siap Kirim)

```text
Tujuan:
Perbaiki tampilan halaman event agar terasa aktif, terstruktur, dan mudah menemukan event penting.

Konteks:
Project: React + TypeScript + Vite
File utama: src/pages/event_page.tsx
Data event: src/data/events.ts
Komponen event terkait: src/components/artikel_acara.tsx
Target: desktop + mobile
Jangan ubah: struktur data event dan behavior navigasi yang sudah berjalan.

Kriteria sukses:
1. Informasi event (tanggal, judul, lokasi/status) terbaca cepat.
2. Visual hierarchy jelas antara event utama dan event lain.
3. Responsive layout kuat di mobile.
4. Accessibility dan readability bagus.

Tugas:
1. Audit halaman event.
2. Implement redesign paling berdampak.
3. Pastikan kompatibel dengan data existing.
4. Beri checklist validasi.
```

## 4) Bugfix Aman (Template Siap Isi Cepat)

```text
Tujuan:
Perbaiki bug sampai tuntas, aman dari regresi, dan minim perubahan tidak perlu.

Konteks:
Project: React + TypeScript + Vite
Gejala: [isi gejala bug]
Lokasi dugaan: [mis. src/pages/article_detail_page.tsx]
Langkah reproduksi:
1. [step 1]
2. [step 2]
3. [step 3]
Ekspektasi: [expected]
Aktual: [actual]

Kriteria sukses:
1. Root cause jelas.
2. Fix minimal tapi robust.
3. Tidak merusak fitur lain.
4. Validasi melalui build/test/skenario manual.

Tugas:
1. Cari akar masalah.
2. Implement fix.
3. Tambah guard jika perlu.
4. Sertakan verifikasi.

Tambahan instruksi hemat request:
Kerjakan end-to-end dalam satu iterasi jika memungkinkan.
```

## 5) Refactor Terarah Minim Risiko (Siap Kirim)

```text
Tujuan:
Refactor area halaman konten agar lebih rapi dan mudah dirawat tanpa mengubah behavior.

Konteks:
Area refactor:
- src/pages/article_detail_page.tsx
- src/pages/article_page.tsx
- src/pages/event_page.tsx
Batasan:
1. Jangan ubah kontrak data.
2. Jangan ubah output UI secara drastis kecuali disebutkan.
3. Jangan tambah dependency yang tidak perlu.

Kriteria sukses:
1. Struktur file lebih jelas.
2. Repetisi berkurang.
3. Naming lebih konsisten.
4. Behavior tetap sama.

Tugas:
1. Audit area berulang/rumit.
2. Refactor bertahap paling penting dulu.
3. Verifikasi tidak ada perubahan behavior.
4. Ringkas perubahan utama.
```

## Cara Pakai Cepat

1. Pilih prompt sesuai kebutuhan.
2. Copy blok prompt.
3. Jika perlu, ganti 2-3 bagian saja (mis. tujuan dan batasan).
4. Kirim sekali dengan instruksi "kerjakan end-to-end" untuk hemat request.
