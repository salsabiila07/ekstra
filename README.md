# Sistem Informasi Manajemen Ekstrakurikuler

Prototype antarmuka berbasis React dan Vite untuk demonstrasi pengelolaan kegiatan ekstrakurikuler. Source of Truth proyek tersedia di `docs/PRD.md`, `docs/UI-GUIDELINE.md`, dan `docs/IMPLEMENTATION_PLAN.md`.

## Menjalankan aplikasi

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite. Untuk membuat build produksi dan melihat hasil build secara lokal:

```bash
npm run build
npm run preview
```

## Peran demo

Pemilih peran di header membuka tampilan Admin, Siswa, Pembina, dan Kepala Sekolah. Navigasi menggunakan hash route. Data contoh diberi label sebagai data demonstrasi.

## Batasan prototype

- Data disimpan di state aplikasi dan kembali ke data awal setelah halaman dimuat ulang.
- Belum ada backend, database, autentikasi, atau otorisasi server.
- Cetak laporan menggunakan dialog cetak browser; penyimpanan PDF dilakukan melalui pilihan browser.
- Aturan pendaftaran, penilaian, akses data siswa, dan pengarsipan telah dikonfirmasi dan dicatat di `docs/PRD.md`.
- Target akhir prototype atau full-stack serta pilihan backend/database masih belum diputuskan.
- Daftar kegiatan Pembina pada demo belum difilter berdasarkan identitas pembina.
# ekstra
