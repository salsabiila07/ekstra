export const initialExtracurriculars = [
  { id: 'ekskul-01', name: 'Pramuka', description: 'Kegiatan kepramukaan untuk membangun kemandirian dan kerja sama.', advisor: 'Budi Santoso', day: 'Jumat', time: '14.00–16.00', location: 'Lapangan sekolah', capacity: 40, active: true, archived: false },
  { id: 'ekskul-02', name: 'Paskibra', description: 'Latihan baris-berbaris dan pengembangan kedisiplinan.', advisor: 'Siti Rahmawati', day: 'Rabu', time: '15.00–16.30', location: 'Lapangan sekolah', capacity: 30, active: true, archived: false },
  { id: 'ekskul-03', name: 'Futsal', description: 'Latihan teknik dasar dan kerja sama tim futsal.', advisor: 'Andi Pratama', day: 'Selasa', time: '15.30–17.00', location: 'Lapangan olahraga', capacity: 24, active: true, archived: false },
  { id: 'ekskul-04', name: 'Basket', description: 'Pengembangan keterampilan dan strategi permainan basket.', advisor: 'Dewi Lestari', day: 'Kamis', time: '15.30–17.00', location: 'Lapangan basket', capacity: 24, active: true, archived: false },
  { id: 'ekskul-05', name: 'PMR', description: 'Pengenalan pertolongan pertama dan kepedulian sosial.', advisor: 'Rina Puspita', day: 'Senin', time: '14.30–16.00', location: 'Ruang UKS', capacity: 25, active: true, archived: false },
  { id: 'ekskul-06', name: 'Tari', description: 'Eksplorasi tari tradisional dan pengembangan ekspresi.', advisor: 'Maya Kusuma', day: 'Kamis', time: '14.00–15.30', location: 'Aula sekolah', capacity: 20, active: false, archived: false },
  { id: 'ekskul-07', name: 'Musik', description: 'Latihan musik bersama dan pengembangan kreativitas.', advisor: 'Rizky Maulana', day: 'Jumat', time: '15.00–16.30', location: 'Ruang musik', capacity: 20, active: true, archived: false },
];

export const mockDashboardSummary = {
  studentCount: 348,
  activeActivityCount: (activities) => activities.filter((activity) => activity.active && !activity.archived).length,
  advisorCount: (activities) => new Set(activities.filter((activity) => !activity.archived).map((activity) => activity.advisor.trim().toLowerCase()).filter(Boolean)).size,
};

export const initialRegistrations = [
  { id: 'demo-reg-01', student: 'Siswa Demo 01', activityId: 'ekskul-01', activityName: 'Pramuka', submittedAt: '2026-10-01', status: 'Diterima' },
  { id: 'demo-reg-02', student: 'Siswa Demo 02', activityId: 'ekskul-03', activityName: 'Futsal', submittedAt: '2026-10-02', status: 'Diterima' },
  { id: 'demo-reg-03', student: 'Siswa Demo 03', activityId: 'ekskul-05', activityName: 'PMR', submittedAt: '2026-10-03', status: 'Diterima' },
];
