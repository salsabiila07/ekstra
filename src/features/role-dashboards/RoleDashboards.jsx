import { EmptyState } from '../../components/feedback/EmptyState.jsx';
import { StatCard } from '../../components/ui/StatCard.jsx';
import { StatusBadge } from '../../components/ui/StatusBadge.jsx';
import { attendanceStatuses } from '../../data/mock/attendance.js';
import { mockDashboardSummary } from '../../data/mock/extracurriculars.js';

const DEMO_STUDENT = 'Siswa Demo 01';

function DemoNote({ children = 'Informasi pada halaman ini menggunakan data demonstrasi.' }) {
  return <p className="demo-note"><span aria-hidden="true">ⓘ</span> {children}</p>;
}

function ActivityRows({ activities, emptyTitle, emptyMessage }) {
  return activities.length ? (
    <ul className="activity-summary-list">
      {activities.map((activity) => (
        <li key={activity.id}>
          <span className="activity-summary-icon" aria-hidden="true">◇</span>
          <span className="activity-summary-copy">
            <strong>{activity.name}</strong>
            <small>{activity.day} · {activity.time} · {activity.location}</small>
          </span>
          <span className="activity-summary-advisor">{activity.advisor}</span>
        </li>
      ))}
    </ul>
  ) : <EmptyState title={emptyTitle} message={emptyMessage} />;
}

export function StudentHome({ activities, registrations }) {
  const ownRegistrations = registrations.filter((registration) => registration.student === DEMO_STUDENT);
  const registeredIds = new Set(ownRegistrations.filter((registration) => registration.status === 'Diterima').map((registration) => registration.activityId));
  const ownActivities = activities.filter((activity) => registeredIds.has(activity.id) && !activity.archived);
  const activeCount = activities.filter((activity) => activity.active && !activity.archived).length;

  return (
    <div className="feature-page role-dashboard">
      <section className="dashboard-stats" aria-label="Ringkasan siswa demo">
        <StatCard label="Pendaftaran saya" value={ownRegistrations.length} icon="◇" tone="blue" detail="Status pendaftaran demo" />
        <StatCard label="Kegiatan diikuti" value={ownActivities.length} icon="✓" tone="green" detail="Pendaftaran berstatus diterima" />
        <StatCard label="Kegiatan tersedia" value={activeCount} icon="＋" tone="pink" detail="Kegiatan aktif pada data demo" />
      </section>
      <section className="feature-panel" aria-labelledby="student-activities-title">
        <div className="feature-panel__heading"><div><h2 id="student-activities-title">Jadwal kegiatan saya</h2><p>Kegiatan dengan pendaftaran berstatus diterima.</p></div><a className="role-dashboard__link" href="#/siswa/jadwal">Lihat semua jadwal</a></div>
        <ActivityRows activities={ownActivities} emptyTitle="Belum ada jadwal kegiatan saya" emptyMessage="Kegiatan yang pendaftarannya diterima akan muncul di sini." />
        <DemoNote>Ringkasan ini untuk Siswa Demo 01. Data hanya tersedia selama sesi aplikasi.</DemoNote>
      </section>
    </div>
  );
}

export function CoachDashboard({ activities, attendanceRecords, assessmentRecords }) {
  const activeActivities = activities.filter((activity) => activity.active && !activity.archived);
  const attendedCount = attendanceRecords.filter((record) => record.status === 'Hadir').length;
  const statusSummary = attendanceStatuses.map((status) => ({ status, count: attendanceRecords.filter((record) => record.status === status).length }));

  return (
    <div className="feature-page role-dashboard">
      <section className="dashboard-stats" aria-label="Ringkasan pembina demonstrasi">
        <StatCard label="Kegiatan aktif" value={activeActivities.length} icon="◇" tone="blue" detail="Pada data demonstrasi" />
        <StatCard label="Catatan absensi" value={attendanceRecords.length} icon="✓" tone="green" detail="Seluruh sesi demo" />
        <StatCard label="Penilaian tercatat" value={assessmentRecords.length} icon="✳" tone="pink" detail="Seluruh periode demo" />
      </section>
      <div className="dashboard-panels">
        <section className="feature-panel" aria-labelledby="coach-activities-title">
          <div className="feature-panel__heading"><div><h2 id="coach-activities-title">Kegiatan dalam data demo</h2><p>Daftar ini belum difilter berdasarkan akun pembina.</p></div><span className="feature-panel__count">{activeActivities.length} kegiatan aktif</span></div>
          <ActivityRows activities={activeActivities} emptyTitle="Belum ada kegiatan aktif" emptyMessage="Kegiatan aktif akan ditampilkan di sini." />
        </section>
        <aside className="feature-panel role-dashboard__summary" aria-label="Ringkasan absensi demonstrasi">
          <h2>Ringkasan absensi</h2>
          {statusSummary.map(({ status, count }) => <div className="role-dashboard__status" key={status}><StatusBadge status={status} /><strong>{count}</strong></div>)}
          <p>{attendedCount} catatan berstatus hadir dari {attendanceRecords.length} catatan.</p>
          <nav className="role-dashboard__actions" aria-label="Aksi pembina"><a href="#/pembina/absensi">Buka absensi</a><a href="#/pembina/penilaian">Buka penilaian</a></nav>
        </aside>
      </div>
      <DemoNote>Data kegiatan, absensi, dan penilaian merupakan simulasi; daftar kegiatan belum terikat pada identitas pembina tertentu.</DemoNote>
    </div>
  );
}

export function CoachActivities({ activities }) {
  const visibleActivities = activities.filter((activity) => !activity.archived);
  return (
    <div className="feature-page role-dashboard">
      <section className="feature-panel" aria-labelledby="coach-activities-list-title">
        <div className="feature-panel__heading"><div><h2 id="coach-activities-list-title">Kegiatan ekstrakurikuler</h2><p>Jadwal, lokasi, dan pembina dari daftar data demonstrasi.</p></div><span className="feature-panel__count">{visibleActivities.length} kegiatan</span></div>
        <ActivityRows activities={visibleActivities} emptyTitle="Belum ada kegiatan" emptyMessage="Kegiatan yang tersedia akan muncul di sini." />
        <DemoNote>Daftar ini belum difilter berdasarkan pembina yang sedang dipilih.</DemoNote>
      </section>
    </div>
  );
}

export function PrincipalSummary({ activities, registrations, attendanceRecords, assessmentRecords }) {
  const activeActivities = activities.filter((activity) => activity.active && !activity.archived);
  const acceptedCount = registrations.filter((registration) => registration.status === 'Diterima').length;
  const attendanceRate = attendanceRecords.length
    ? Math.round((attendanceRecords.filter((record) => record.status === 'Hadir').length / attendanceRecords.length) * 100)
    : null;

  return (
    <div className="feature-page role-dashboard">
      <section className="dashboard-stats" aria-label="Ringkasan sekolah demonstrasi">
        <StatCard label="Jumlah siswa" value={mockDashboardSummary.studentCount.toLocaleString('id-ID')} icon="♙" tone="blue" detail="Angka data demonstrasi" />
        <StatCard label="Kegiatan aktif" value={activeActivities.length} icon="◇" tone="pink" detail="Dihitung dari daftar kegiatan" />
        <StatCard label="Peserta diterima" value={acceptedCount} icon="✓" tone="green" detail="Pendaftaran pada data demo" />
        <StatCard label="Catatan absensi" value={attendanceRecords.length} icon="▤" tone="amber" detail="Seluruh catatan demo" />
        <StatCard label="Penilaian" value={assessmentRecords.length} icon="✳" tone="blue" detail="Seluruh periode demo" />
      </section>
      <section className="feature-panel" aria-labelledby="principal-activity-title">
        <div className="feature-panel__heading"><div><h2 id="principal-activity-title">Kegiatan aktif</h2><p>Ringkasan baca-saja dari daftar ekstrakurikuler.</p></div><span className="feature-panel__count">{activeActivities.length} kegiatan</span></div>
        <ActivityRows activities={activeActivities} emptyTitle="Belum ada kegiatan aktif" emptyMessage="Ringkasan kegiatan aktif akan muncul di sini." />
        <div className="role-dashboard__report-summary"><span>Tingkat kehadiran dari catatan yang tersedia</span><strong>{attendanceRate === null ? 'Belum ada data' : `${attendanceRate}%`}</strong></div>
        <p className="role-dashboard__report-link"><a href="#/kepala-sekolah/laporan">Buka laporan lengkap</a></p>
        <DemoNote>Ringkasan ini baca-saja dan dihitung dari data demonstrasi.</DemoNote>
      </section>
    </div>
  );
}
