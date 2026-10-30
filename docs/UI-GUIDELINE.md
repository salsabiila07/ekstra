# UI Guideline — Sistem Informasi Manajemen Ekstrakurikuler

**Versi:** 0.1 (Draft)  
**Status:** Menunggu tinjauan dan persetujuan

## 1. Arah visual
Gaya modern futuristic SaaS: bersih, ringan, terstruktur, profesional, dan ramah bagi pengguna sekolah. Hindari efek neon berlebihan, gradient di semua elemen, bayangan berat, atau dekorasi yang mengganggu keterbacaan.

## 2. Palet warna
| Token | Nilai | Penggunaan |
|---|---|---|
| Primary Blue | `#2563EB` | Tombol utama, tautan, navigasi aktif |
| Deep Blue | `#1E40AF` | Hover/penekanan |
| Pink Accent | `#EC4899` | Highlight, aksen, elemen sekunder |
| White | `#FFFFFF` | Permukaan kartu dan panel |
| App Background | `#F6F8FC` | Latar halaman |
| Text Primary | `#172033` | Teks utama |
| Text Secondary | `#64748B` | Teks sekunder |
| Border | `#E2E8F0` | Garis pemisah dan batas komponen |
| Success | `#16A34A` | Status berhasil |
| Warning | `#D97706` | Status menunggu/peringatan |
| Danger | `#DC2626` | Status gagal/ditolak |

Pink digunakan sebagai aksen, bukan warna teks kecil di atas latar putih jika kontrasnya tidak cukup. Status harus memakai teks/ikon selain warna.

## 3. Tipografi dan bentuk
- Gunakan font sans-serif modern, misalnya Inter atau system-ui.
- Hierarki: judul halaman 24–30 px desktop; judul bagian 16–20 px; isi 14–16 px; label kecil minimal 12 px.
- Radius kartu 12–16 px; input dan tombol 8–12 px.
- Spacing berbasis kelipatan 4 atau 8 px.
- Gunakan ikon satu keluarga dan label teks untuk navigasi utama.

## 4. Kerangka layout
- Sidebar desktop yang dapat diciutkan bila dibutuhkan.
- Header berisi judul/konteks halaman dan area profil pengguna.
- Area konten dengan lebar fleksibel, jarak antarkartu konsisten.
- Pada mobile, sidebar berubah menjadi drawer/menu yang mudah diakses.
- Jangan membuat tabel melebar di luar viewport; gunakan overflow terkontrol atau tampilan kartu pada layar sempit.

## 5. Navigasi berdasarkan aktor
**Admin:** Dashboard, Ekstrakurikuler, Pendaftaran, Jadwal, Laporan.  
**Siswa:** Beranda, Jelajahi Ekstrakurikuler, Pendaftaran Saya, Jadwal.  
**Pembina:** Dashboard Pembina, Kegiatan Binaan, Absensi, Penilaian, Jadwal.  
**Kepala Sekolah:** Ringkasan, Laporan.

Nama menu final perlu diseragamkan pada semua dokumen dan disesuaikan dengan kebijakan sekolah.

## 6. Komponen UI
- `AppShell`, `Sidebar`, `Topbar`, `PageHeader`
- `StatCard`, `ChartCard`, `ActivityList`
- `DataTable`, `FilterBar`, `SearchInput`, `Pagination`
- `StatusBadge`, `EmptyState`, `LoadingState`, `ErrorState`
- `Modal`/`Drawer`, `FormField`, `Select`, `DatePicker` bila dibutuhkan
- `AttendanceStatusControl`, `RatingInput`, `ExportActions`

Komponen harus memiliki satu tanggung jawab yang jelas, mendukung props yang konsisten, dan tidak menggandakan pola styling tanpa alasan.

## 7. Panduan halaman
### Dashboard Admin
- Baris atas: sapaan dan konteks periode.
- Kartu statistik: siswa, kegiatan, pembina, pendaftar, kegiatan aktif.
- Area tengah: ringkasan pendaftaran/kehadiran bila datanya tersedia.
- Area bawah: pendaftaran terbaru dan kegiatan mendatang.
- Semua grafik wajib memiliki label, nilai, dan empty state.

### Manajemen Ekstrakurikuler
- Judul, deskripsi singkat, tombol tambah.
- Pencarian/filter.
- Daftar dalam tabel pada desktop dan layout adaptif pada mobile.
- Aksi edit/hapus harus jelas; konfirmasi untuk tindakan destruktif.

### Pendaftaran
- Kartu atau daftar kegiatan dengan nama, deskripsi, pembina, jadwal, dan status ketersediaan.
- Status pendaftaran ditampilkan dengan label teks.
- Validasi pilihan dan pesan setelah pengiriman.

### Absensi
- Pilih kegiatan dan sesi/tanggal.
- Daftar siswa dengan kontrol status Hadir/Izin/Sakit/Alfa.
- Ringkasan jumlah per status dan tombol simpan.
- Konfirmasi bila pengguna meninggalkan perubahan yang belum disimpan.

### Jadwal
- Tampilan daftar sebagai baseline; kalender hanya jika benar-benar dibutuhkan.
- Setiap item menampilkan hari, jam, lokasi, pembina, dan status perubahan.
- Jangan mengandalkan warna saja untuk membedakan jadwal.

### Penilaian
- Daftar peserta, dimensi nilai, catatan perkembangan, periode.
- Validasi skala nilai sesuai keputusan PRD.
- Tampilkan indikator penyimpanan dan kesalahan per field.

### Laporan
- Filter kegiatan dan periode.
- Ringkasan metrik dan tabel detail.
- Aksi cetak dan ekspor PDF terlihat tetapi tidak mendominasi.
- Pastikan isi hasil ekspor sesuai filter yang sedang aktif.

## 8. Interaksi dan aksesibilitas
- Semua tombol memiliki state default, hover, focus, disabled, dan loading bila relevan.
- Target sentuh mobile idealnya sekitar 44 × 44 px.
- Form memiliki label permanen, bukan hanya placeholder.
- Dialog dapat ditutup dengan tombol jelas dan memiliki fokus yang masuk akal.
- Berikan umpan balik sukses/gagal yang spesifik.
- Hindari animasi berlebihan; hormati preferensi reduced motion jika animasi diterapkan.

## 9. Arah preview visual
Preview yang diharapkan: dashboard admin ber-sidebar biru/navy, permukaan putih, latar abu kebiruan sangat muda, aksen pink secukupnya, kartu statistik dengan ikon, grafik sederhana, tabel rapi, dan whitespace cukup. Semua halaman mengikuti sistem komponen yang sama.

## 10. Batasan desain
Jangan menambahkan fitur produk baru hanya karena ada komponen visual yang menarik. Desain harus mendukung ruang lingkup PRD. Data, grafik, dan nama orang pada preview wajib berupa data simulasi yang jelas.
