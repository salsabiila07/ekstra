export const roleOptions = [
  { id: 'admin', label: 'Admin' },
  { id: 'siswa', label: 'Siswa' },
  { id: 'pembina', label: 'Pembina' },
  { id: 'kepala-sekolah', label: 'Kepala Sekolah' },
];

const navigationByRole = {
  admin: [
    { label: 'Dashboard', hash: '#/admin/dashboard', icon: '⌂' },
    { label: 'Ekstrakurikuler', hash: '#/admin/ekstrakurikuler', icon: '◇' },
    { label: 'Pendaftaran', hash: '#/admin/pendaftaran', icon: '▤' },
    { label: 'Jadwal', hash: '#/admin/jadwal', icon: '▦' },
    { label: 'Laporan', hash: '#/admin/laporan', icon: '▥' },
  ],
  siswa: [
    { label: 'Beranda', hash: '#/siswa/beranda', icon: '⌂' },
    { label: 'Jelajahi Ekstrakurikuler', hash: '#/siswa/ekstrakurikuler', icon: '◇' },
    { label: 'Pendaftaran Saya', hash: '#/siswa/pendaftaran', icon: '▤' },
    { label: 'Jadwal', hash: '#/siswa/jadwal', icon: '▦' },
    { label: 'Nilai Saya', hash: '#/siswa/penilaian', icon: '✳' },
    { label: 'Absensi Saya', hash: '#/siswa/absensi', icon: '✓' },
  ],
  pembina: [
    { label: 'Dashboard Pembina', hash: '#/pembina/dashboard', icon: '⌂' },
    { label: 'Kegiatan Binaan', hash: '#/pembina/kegiatan', icon: '◇' },
    { label: 'Absensi', hash: '#/pembina/absensi', icon: '▤' },
    { label: 'Penilaian', hash: '#/pembina/penilaian', icon: '✳' },
    { label: 'Jadwal', hash: '#/pembina/jadwal', icon: '▦' },
  ],
  'kepala-sekolah': [
    { label: 'Ringkasan', hash: '#/kepala-sekolah/ringkasan', icon: '⌂' },
    { label: 'Laporan', hash: '#/kepala-sekolah/laporan', icon: '▥' },
  ],
};

export function getNavigation(role) {
  return navigationByRole[role] ?? navigationByRole.admin;
}

export function resolveRoute(hash = window.location.hash) {
  const [, role = 'admin', ...pathParts] = hash.replace(/^#\/?/, '').split('/');
  const path = pathParts.join('/') || (role === 'siswa' ? 'beranda' : role === 'kepala-sekolah' ? 'ringkasan' : 'dashboard');
  const navigation = getNavigation(role);
  const active = navigation.find((item) => item.hash === `#/${role}/${path}`) ?? navigation[0];
  return { role: roleOptions.some((option) => option.id === role) ? role : 'admin', path, active };
}
