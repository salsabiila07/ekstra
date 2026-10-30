# PRD — Sistem Informasi Manajemen Ekstrakurikuler

**Versi:** 0.1 (Draft)  
**Status:** Menunggu tinjauan dan persetujuan  
**Produk:** Aplikasi web manajemen ekstrakurikuler sekolah

## 1. Ringkasan produk
Aplikasi ini memusatkan pengelolaan ekstrakurikuler sekolah, termasuk data kegiatan, pendaftaran, jadwal, absensi, penilaian, dan laporan. Tujuannya mengurangi proses manual, memperjelas status pendaftaran, menjaga konsistensi data, dan membantu sekolah mengevaluasi partisipasi siswa.

## 2. Tujuan
1. Menyediakan pengelolaan kegiatan ekstrakurikuler dalam satu aplikasi.
2. Memungkinkan siswa mendaftar secara online dan memeriksa statusnya.
3. Membantu pembina mencatat kehadiran dan perkembangan siswa.
4. Menyediakan informasi jadwal yang konsisten.
5. Menyediakan laporan yang dapat ditinjau, dicetak, atau diekspor ke PDF.

## 3. Aktor dan akses
| Aktor | Hak akses utama |
|---|---|
| Admin | Dashboard, CRUD ekstrakurikuler, pengelolaan pendaftaran, jadwal, pemantauan data, dan laporan |
| Siswa | Melihat daftar kegiatan, mendaftar, memeriksa status pendaftaran, melihat jadwal, dan melihat informasi yang diizinkan |
| Pembina | Melihat kegiatan binaan, daftar peserta, mencatat absensi, mengelola penilaian dan catatan perkembangan |
| Kepala Sekolah | Melihat dashboard ringkasan dan laporan; akses bersifat baca-saja kecuali diputuskan lain |

Hak akses harus diterapkan pada navigasi dan tindakan. Jika backend diterapkan, otorisasi wajib divalidasi di server, bukan hanya dengan menyembunyikan menu.

## 4. Ruang lingkup fitur

### 4.1 Dashboard Admin
- Ringkasan jumlah siswa, ekstrakurikuler, pembina, pendaftar, dan kegiatan aktif.
- Visual ringkas untuk tren pendaftaran atau kehadiran jika data tersedia.
- Tautan cepat menuju area pengelolaan.
- Angka pada dashboard harus berasal dari data sumber; data simulasi diberi label.

### 4.2 Manajemen Ekstrakurikuler
- Tambah, lihat, edit, dan arsipkan kegiatan.
- Contoh data awal: Pramuka, Paskibra, Futsal, Basket, PMR, Tari, Musik.
- Informasi minimal: nama, deskripsi, pembina, jadwal, lokasi, kapasitas (opsional), status aktif.
- Validasi nama dan field wajib. Kegiatan yang dihentikan diarsipkan agar riwayat pendaftaran dan absensi tetap terjaga; penghapusan permanen tidak digunakan.

### 4.3 Pendaftaran Ekstrakurikuler
- Siswa melihat daftar kegiatan dan detailnya.
- Siswa memilih kegiatan dan mengirim pendaftaran.
- Siswa dapat melihat status pendaftaran.
- Admin dapat melihat dan meninjau pendaftaran.
- Pendaftaran langsung berstatus Diterima jika kegiatan aktif dan kapasitasnya masih tersedia; persetujuan Admin tidak diperlukan.
- Siswa dapat memilih kegiatan tanpa batas jumlah, tetapi tidak dapat mendaftar dua kali untuk kegiatan yang sama.
- Kapasitas kegiatan tetap membatasi jumlah pendaftaran yang diterima. Jika kapasitas telah terpenuhi, pendaftaran baru ditolak dengan umpan balik yang jelas.
- Admin dapat melihat dan meninjau daftar pendaftaran.

### 4.4 Absensi Siswa
- Pembina memilih kegiatan dan tanggal pertemuan.
- Pembina mencatat status Hadir, Izin, Sakit, atau Alfa.
- Sistem menyimpan riwayat per siswa dan per kegiatan.
- Validasi mencegah duplikasi catatan untuk siswa, kegiatan, dan tanggal/sesi yang sama.

### 4.5 Jadwal Kegiatan
- Menampilkan hari, jam, lokasi, nama pembina, dan informasi perubahan.
- Jadwal dapat dilihat Admin, Pembina, dan Siswa.
- Perubahan jadwal harus terlihat dengan jelas; cara pemberitahuan (notifikasi/email/pesan) belum termasuk sampai disepakati.

### 4.6 Penilaian dan Perkembangan Siswa
- Pembina memberi penilaian yang terkait dengan siswa dan kegiatan.
- Dimensi: keterampilan, kedisiplinan, dan keaktifan.
- Catatan perkembangan berbentuk teks dengan batas panjang yang wajar.
- Nilai berupa bilangan bulat pada skala 1–100 dan dicatat per semester (Ganjil atau Genap).
- Siswa dapat melihat nilai dan riwayat absensinya sendiri.

### 4.7 Laporan dan Rekap Data
- Rekap jumlah peserta per ekstrakurikuler.
- Rekap absensi, hasil penilaian, dan keaktifan.
- Filter minimal yang disarankan: kegiatan dan rentang tanggal/periode.
- Cetak dan ekspor PDF.
- Laporan Kepala Sekolah bersifat baca-saja.
- PDF harus dihasilkan dari data yang difilter dan menampilkan judul, periode, waktu pembuatan, serta ringkasan yang relevan.

## 5. Kebutuhan nonfungsional
- Antarmuka responsif untuk desktop, tablet, dan ponsel.
- Navigasi konsisten dan dapat dipahami oleh pengguna nonteknis.
- Form memiliki label, validasi, pesan sukses/gagal, dan kondisi loading.
- Mendukung keyboard, fokus terlihat, kontras teks yang memadai, dan struktur heading yang masuk akal.
- Data siswa hanya ditampilkan sesuai kewenangan.
- Komponen UI reusable dan struktur kode mudah dirawat.
- Penanganan error dan empty state harus dirancang.
- Jangan menyimpan rahasia, kredensial, atau data pribadi nyata di repository.

## 6. Batasan dan asumsi
- Front-end menggunakan React + Vite dan JavaScript/JSX.
- Desain memakai kombinasi biru, putih, dan pink dengan gaya modern futuristik SaaS.
- Backend, database, autentikasi produksi, layanan notifikasi, dan hosting belum ditetapkan.
- Jika belum ada backend, aplikasi boleh memakai data mock untuk demonstrasi dan harus menandainya dengan jelas.
- Tidak menambahkan modul di luar tujuh kelompok fitur yang ditentukan tanpa persetujuan.
- Nama sekolah, logo, tahun ajaran, dan kapasitas kegiatan masih dapat dikonfigurasi. Kebijakan pendaftaran, skala/periode penilaian, akses siswa ke data miliknya, dan pengarsipan mengikuti keputusan pada dokumen ini.

## 7. Kriteria penerimaan
1. Empat aktor memiliki tampilan dan tindakan sesuai hak akses yang ditentukan.
2. Tujuh kelompok fitur tercakup dalam navigasi dan alur produk.
3. CRUD kegiatan memiliki validasi dan umpan balik.
4. Alur pendaftaran menampilkan status yang dapat dipahami.
5. Absensi menyediakan empat status dan riwayat.
6. Jadwal menampilkan hari, waktu, lokasi, pembina, serta informasi perubahan.
7. Penilaian mengakomodasi keterampilan, kedisiplinan, keaktifan, dan catatan.
8. Laporan menyediakan rekap dan alur cetak/ekspor PDF sesuai implementasi yang dipilih.
9. Semua halaman utama memiliki loading, empty, success, dan error state yang relevan.
10. Tampilan berfungsi pada ukuran layar umum dan tidak memiliki overflow horizontal yang tidak disengaja.
11. Data demo tidak disamarkan sebagai data nyata.
12. Integrasi backend yang belum disetujui tidak boleh diklaim berfungsi.

## 8. Pertanyaan yang belum diputuskan
- Apakah target awal berupa prototype front-end atau aplikasi full-stack?
- Jika full-stack, backend dan database apa yang digunakan?

### Keputusan bisnis yang dikonfirmasi
Pada 23 Oktober 2026, pengguna menyetujui keputusan berikut untuk implementasi:
- Pendaftaran tanpa batas jumlah kegiatan per siswa, langsung diterima jika kegiatan aktif dan kapasitas tersedia; pendaftaran duplikat untuk kegiatan yang sama dicegah.
- Skala penilaian 1–100, menggunakan bilangan bulat, dengan periode Semester Ganjil dan Semester Genap.
- Siswa boleh melihat nilai dan riwayat absensinya sendiri.
- Kegiatan yang dihentikan diarsipkan agar riwayat tetap tersedia; tidak dihapus permanen.
