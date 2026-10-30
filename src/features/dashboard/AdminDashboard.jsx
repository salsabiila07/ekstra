import { StatCard } from '../../components/ui/StatCard.jsx';
import { StatusBadge } from '../../components/ui/StatusBadge.jsx';
import { mockDashboardSummary } from '../../data/mock/extracurriculars.js';

const summaryCards = [
  { key: 'students', label: 'Jumlah siswa', icon: '♙', tone: 'blue', value: () => mockDashboardSummary.studentCount.toLocaleString('id-ID'), detail: 'Data demonstrasi' },
  { key: 'activities', label: 'Ekstrakurikuler', icon: '◇', tone: 'pink', value: (activities) => activities.filter((activity) => !activity.archived).length, detail: 'Kegiatan tidak diarsipkan' },
  { key: 'advisors', label: 'Pembina', icon: '♧', tone: 'green', value: (activities) => mockDashboardSummary.advisorCount(activities), detail: 'Pembina pada data demo' },
  { key: 'applicants', label: 'Pendaftar', icon: '▤', tone: 'amber', value: (_activities, registrations) => registrations.length, detail: 'Data demonstrasi' },
  { key: 'active', label: 'Kegiatan aktif', icon: '✳', tone: 'blue', value: (activities) => mockDashboardSummary.activeActivityCount(activities), detail: 'Siap menerima peserta' },
];

export function AdminDashboard({ activities, registrations }) {
  const activeActivities = activities.filter((activity) => activity.active && !activity.archived);
  const activityNames = new Map(activities.map((activity) => [activity.id, activity.name]));
  const recentRegistrations = registrations
    .slice()
    .sort((first, second) => second.submittedAt.localeCompare(first.submittedAt))
    .slice(0, 4);

  function formatRegistrationDate(date) {
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(new Date(`${date}T00:00:00`));
  }

  return (
    <div className="feature-page">
      <section className="dashboard-stats" aria-label="Ringkasan statistik demonstrasi">
        {summaryCards.map((card) => <StatCard key={card.key} label={card.label} value={card.value(activities, registrations)} icon={card.icon} tone={card.tone} detail={card.detail} />)}
      </section>
      <div className="dashboard-panels">
        <section className="feature-panel" aria-labelledby="active-activities-title">
          <div className="feature-panel__heading"><div><h2 id="active-activities-title">Kegiatan aktif</h2><p>Ringkasan ekstrakurikuler yang berstatus aktif.</p></div><span className="feature-panel__count">{activeActivities.length} kegiatan</span></div>
          <ul className="activity-summary-list">
            {activeActivities.length ? activeActivities.slice(0, 5).map((activity) => (
              <li key={activity.id}><span className="activity-summary-icon" aria-hidden="true">◇</span><span className="activity-summary-copy"><strong>{activity.name}</strong><small>{activity.day} · {activity.time} · {activity.location}</small></span><span className="activity-summary-advisor">{activity.advisor}</span></li>
            )) : <li className="activity-summary-empty">Belum ada kegiatan aktif.</li>}
          </ul>
          <div className="dashboard-recent">
            <div className="dashboard-subheading"><h3>Pendaftaran terbaru</h3><span>{recentRegistrations.length} terbaru</span></div>
            {recentRegistrations.length ? <ul className="dashboard-registration-list">{recentRegistrations.map((registration) => (
              <li key={registration.id}>
                <span className="dashboard-registration-copy"><strong>{registration.student}</strong><small>{activityNames.get(registration.activityId) ?? registration.activityName} · {formatRegistrationDate(registration.submittedAt)}</small></span>
                <StatusBadge status={registration.status} />
              </li>
            ))}</ul> : <p className="dashboard-registration-empty">Belum ada pendaftaran.</p>}
          </div>
          <p className="demo-note"><span aria-hidden="true">ⓘ</span> Seluruh angka dan nama pada dashboard ini merupakan data demonstrasi.</p>
        </section>
        <aside className="dashboard-note"><div className="dashboard-note__icon" aria-hidden="true">✳</div><span className="dashboard-note__eyebrow">RINGKASAN SEKOLAH</span><h2>Aktivitas ekstrakurikuler</h2><p>Statistik kegiatan dan pembina dihitung dari daftar data demonstrasi yang sama dengan halaman ekstrakurikuler.</p><div className="dashboard-note__footer"><span>Periode demo</span><strong>Tahun ajaran 2025 / 2026</strong></div></aside>
      </div>
      <nav className="dashboard-quick-links" aria-label="Tautan cepat admin"><a href="#/admin/ekstrakurikuler">Kelola ekstrakurikuler</a><a href="#/admin/pendaftaran">Tinjau pendaftaran</a><a href="#/admin/jadwal">Lihat jadwal</a><a href="#/admin/laporan">Buka laporan</a></nav>
    </div>
  );
}
