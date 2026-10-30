# Implementation Plan — Sistem Informasi Manajemen Ekstrakurikuler

**Versi:** 0.1 (Draft)  
**Status:** Menunggu tinjauan dan persetujuan

## 1. Prinsip implementasi
- SOT adalah acuan utama. Jika instruksi lain bertentangan, hentikan dan minta klarifikasi.
- Implementasi dilakukan bertahap dan setiap fase memerlukan persetujuan pengguna.
- Jangan mengklaim fungsi backend jika hanya memakai data mock.
- Prioritaskan alur end-to-end sederhana, aksesibilitas, dan konsistensi UI.
- Hindari dependency tambahan kecuali ada kebutuhan jelas.

## 2. Stack awal
- React + Vite
- JavaScript/JSX
- CSS terstruktur dengan design tokens
- React Router dapat digunakan bila multi-halaman memerlukannya
- Library ikon/chart/PDF dipilih saat fase implementasi dan dicatat alasannya
- Backend/database: belum ditetapkan; tidak boleh diasumsikan

## 3. Struktur folder yang disarankan
```text
src/
  app/
    App.jsx
    routes.jsx
  assets/
  components/
    layout/
    ui/
    feedback/
  features/
    dashboard/
    extracurriculars/
    registrations/
    attendance/
    schedule/
    assessments/
    reports/
  data/
    mock/
  hooks/
  services/
  styles/
    tokens.css
    global.css
  utils/
  main.jsx
```
Struktur boleh disederhanakan jika prototype kecil, tetapi fitur dan komponen harus tetap terpisah secara logis.

## 4. Fase implementasi
### Fase 0 — Konfirmasi
- Konfirmasi prototype atau full-stack.
- Konfirmasi backend/database bila full-stack.
- Konfirmasi aturan bisnis yang masih terbuka.
- Keluaran: keputusan yang disetujui, tanpa kode produk.

### Fase 1 — Fondasi proyek
- Buat proyek Vite React.
- Siapkan tokens warna, tipografi, reset/global styles.
- Siapkan AppShell, navigasi role-aware, routing dan layout responsif.
- Kriteria selesai: aplikasi berjalan, semua route utama dapat dibuka, lint/build berhasil jika skrip tersedia.

### Fase 2 — Komponen bersama
- Bangun tombol, input, badge status, kartu statistik, tabel, dialog, empty/loading/error states.
- Pastikan focus state dan label formulir tersedia.
- Kriteria selesai: komponen dapat dipakai lintas halaman tanpa duplikasi besar.

### Fase 3 — Dashboard dan master data
- Dashboard Admin.
- Manajemen Ekstrakurikuler: list, tambah, edit, hapus/arsip sesuai keputusan.
- Data mock terpusat jika backend belum disiapkan.
- Kriteria selesai: alur UI dan validasi berfungsi.

### Fase 4 — Alur pendaftaran dan jadwal
- Daftar/detail kegiatan.
- Form pendaftaran dan status.
- Tampilan jadwal dan perubahan jadwal.
- Kriteria selesai: status dan pesan UI konsisten.

### Fase 5 — Absensi dan penilaian
- Pemilihan kegiatan/sesi.
- Pencatatan empat status absensi.
- Input nilai dan catatan perkembangan.
- Kriteria selesai: validasi, riwayat mock/persistensi sesuai scope, dan feedback jelas.

### Fase 6 — Laporan
- Filter laporan, rekap peserta/absensi/penilaian/keaktifan.
- Cetak dan ekspor PDF sesuai pendekatan yang disetujui.
- Kriteria selesai: isi laporan sesuai filter dan tidak menyatakan data mock sebagai data nyata.

### Fase 7 — QA dan penyerahan
- Uji alur aktor.
- Uji responsive viewport.
- Uji empty/error/loading states.
- Periksa konsol, aksesibilitas dasar, dan build.
- Dokumentasikan cara menjalankan proyek serta batasan yang belum dikerjakan.

## 5. Strategi pengujian
- Build: `npm run build`.
- Jalankan lokal: `npm run dev`.
- Uji manual role/route dan alur utama.
- Uji form: field wajib, nilai tidak valid, submit berhasil/gagal.
- Uji layout pada mobile, tablet, dan desktop.
- Jika test runner ditambahkan, gunakan untuk utilitas dan aturan bisnis penting.

## 6. Risiko dan mitigasi
| Risiko | Mitigasi |
|---|---|
| Aturan pendaftaran belum jelas | Konfirmasi batas pilihan dan persetujuan admin sebelum finalisasi |
| Data dashboard tidak konsisten | Hitung dari satu sumber data; hindari angka hard-coded di produksi |
| Akses hanya disembunyikan di UI | Implementasikan otorisasi server bila backend ada |
| PDF tidak sesuai filter | Gunakan satu sumber data hasil filter untuk preview dan ekspor |
| Lingkup melebar | Perubahan fitur wajib mendapat persetujuan |
| Terlalu banyak dependency | Tambahkan hanya setelah kebutuhan dan trade-off dijelaskan |

## 7. Definisi selesai
Fitur dianggap selesai bila:
- sesuai PRD dan UI Guideline,
- alur utama dapat dijalankan,
- state kosong/loading/error tersedia sesuai kebutuhan,
- layout responsif,
- tidak ada error build yang diketahui,
- batasan/mock data didokumentasikan,
- dan pengguna menyetujui hasil fase tersebut.

## 8. Gerbang persetujuan
Sebelum pindah fase, agen wajib melaporkan:
1. perubahan yang dibuat,
2. file yang ditambah/diubah,
3. pengujian yang dilakukan dan hasilnya,
4. keterbatasan/risiko,
5. keputusan yang dibutuhkan dari pengguna.
Jangan melanjutkan ke fase berikutnya sampai pengguna menyatakan setuju.
