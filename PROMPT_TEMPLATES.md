# Prompt Templates Hemat Request

Kumpulan template ini dibuat agar hasil tetap berkualitas tinggi dengan jumlah request lebih hemat.

## 1) Template Redesign UI Premium (Sekali Jalan)

```text
Tujuan:
Saya ingin redesign [nama halaman/fitur] agar terlihat premium, modern, dan tetap cepat.

Konteks:
Project: [React + TS + Vite / stack lain]
File utama: [path file]
Komponen terkait: [daftar komponen]
Constraint brand: [warna, tone, style]
Target device: desktop + mobile
Jangan ubah: [logic tertentu, API, struktur data]

Kriteria sukses:
1. Visual kuat, tidak template generik.
2. Responsif rapi di mobile dan desktop.
3. Accessibility bagus (kontras, semantic, keyboard).
4. Kode bersih, maintainable, mudah dikembangkan.
5. Tidak menambah dependency kecuali sangat perlu.

Tugas:
1. Audit singkat masalah UI sekarang.
2. Beri rencana perubahan paling impactful.
3. Implementasikan langsung seluruh perubahan yang disarankan.
4. Jelaskan alasan desain dan teknis secara ringkas.
5. Sertakan checklist verifikasi akhir.

Output yang saya mau:
1. Perubahan final siap pakai.
2. Ringkasan before vs after.
3. Daftar file yang diubah.
4. Catatan risiko kecil jika ada.
```

## 2) Template Bugfix Cepat Tapi Aman

```text
Tujuan:
Perbaiki bug [deskripsi bug] sampai tuntas, aman dari regresi, dan minim perubahan tidak perlu.

Konteks:
Gejala: [error message/perilaku salah]
Lokasi dugaan: [file/fungsi]
Langkah reproduksi: [step by step]
Ekspektasi benar: [expected behavior]
Aktual sekarang: [actual behavior]

Kriteria sukses:
1. Root cause jelas.
2. Fix minimal tapi robust.
3. Tidak merusak fitur lain.
4. Build/lint/test yang relevan tetap lolos.

Tugas:
1. Identifikasi akar masalah dengan singkat.
2. Implement fix langsung.
3. Tambahkan guard/validasi jika diperlukan.
4. Verifikasi lewat test atau skenario reproduksi.
5. Jelaskan kenapa solusi ini paling aman.

Output yang saya mau:
1. Bug teratasi dengan bukti verifikasi.
2. Ringkasan root cause.
3. Daftar file yang berubah.
4. Risiko lanjutan dan mitigasi singkat.
```

## 3) Template Refactor Bersih Minim Regression

```text
Tujuan:
Refactor [modul/halaman] agar lebih rapi, readable, dan mudah maintain tanpa mengubah behavior.

Konteks:
Area refactor: [file/folder]
Masalah saat ini: [duplikasi, naming, kompleksitas, dll]
Batasan: jangan ubah kontrak publik dan output fungsi.

Kriteria sukses:
1. Behavior tetap sama.
2. Struktur kode lebih jelas.
3. Nama fungsi/variabel konsisten.
4. Kompleksitas turun.
5. Tidak ada perubahan di area di luar scope.

Tugas:
1. Review struktur saat ini.
2. Usulkan langkah refactor prioritas.
3. Eksekusi refactor end-to-end sesuai prioritas.
4. Validasi tidak ada behavioral change.
5. Beri ringkasan perubahan yang paling penting.

Output yang saya mau:
1. Hasil refactor final.
2. Mapping lama ke baru (singkat).
3. Daftar file yang diubah.
4. Catatan verifikasi dan sisa technical debt (jika ada).
```

## Tambahan Instruksi Super Hemat Request

Tambahkan blok ini di akhir prompt apa pun:

```text
Tambahan instruksi:
1. Kerjakan sekali jalan sampai final, jangan berhenti di rencana.
2. Hindari bolak-balik klarifikasi kecuali benar-benar blocker.
3. Prioritaskan perubahan paling berdampak.
4. Beri keputusan teknis yang tegas, bukan opsi terlalu banyak.
5. Akhiri dengan checklist verifikasi singkat.
```

## Cara Pakai Cepat

1. Pilih template yang sesuai kebutuhan.
2. Isi bagian dalam tanda [ ].
3. Tempel ke chat Copilot.
4. Jika task besar, tambahkan batasan file agar fokus dan hemat iterasi.
