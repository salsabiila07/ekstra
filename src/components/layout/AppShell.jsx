import { useState } from 'react';
import { getNavigation, roleOptions } from '../../app/routes.jsx';
import { AdminDashboard } from '../../features/dashboard/AdminDashboard.jsx';
import { ExtracurricularPage } from '../../features/extracurriculars/ExtracurricularPage.jsx';
import { SchedulePage } from '../../features/schedule/SchedulePage.jsx';
import { RegistrationPage } from '../../features/registrations/RegistrationPage.jsx';
import { AttendancePage, StudentAttendancePage } from '../../features/attendance/AttendancePage.jsx';
import { AssessmentPage } from '../../features/assessments/AssessmentPage.jsx';
import { ReportsPage } from '../../features/reports/ReportsPage.jsx';
import { CoachActivities, CoachDashboard, PrincipalSummary, StudentHome } from '../../features/role-dashboards/RoleDashboards.jsx';

function getPageTitle(label) {
  return label === 'Dashboard' ? 'Dashboard Admin' : label;
}

export function AppShell({ route, activities, setActivities, registrations, onRegister, attendanceRecords, onSaveAttendance, assessmentRecords, onSaveAssessment }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigation = getNavigation(route.role);
  const currentRole = roleOptions.find((role) => role.id === route.role) ?? roleOptions[0];

  return (
    <div className="app-shell">
      {menuOpen && <button className="sidebar-backdrop" aria-label="Tutup menu" onClick={() => setMenuOpen(false)} />}
      <aside className={`sidebar${menuOpen ? ' sidebar--open' : ''}`} aria-label="Navigasi utama">
        <a className="brand" href={route.active.hash} aria-label="Ruang Ekskul, beranda">
          <span className="brand-mark" aria-hidden="true">R</span>
          <span className="brand-copy"><strong>ruang<span>ekskul</span></strong><small>PORTAL SEKOLAH</small></span>
        </a>

        <div className="sidebar-section-label">MENU UTAMA</div>
        <nav className="nav-list">
          {navigation.map((item) => {
            const selected = item.hash === route.active.hash;
            return (
              <a key={item.hash} className={`nav-item${selected ? ' nav-item--active' : ''}`} href={item.hash} aria-current={selected ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
                <span className="nav-icon" aria-hidden="true">{item.icon}</span><span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card"><span className="help-spark" aria-hidden="true">✳</span><strong>Butuh bantuan?</strong><p>Hubungi administrator sekolah untuk bantuan akses.</p></div>
          <div className="school-mark"><span className="school-avatar">S</span><span><strong>Sekolah Demo</strong><small>Portal ekstrakurikuler</small></span></div>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <button className="menu-toggle" aria-label="Buka menu navigasi" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button>
          <div className="breadcrumb"><span>Ruang Ekskul</span><span className="breadcrumb-divider">/</span><strong>{getPageTitle(route.active.label)}</strong></div>
          <div className="topbar-actions">
            <label className="role-switcher"><span className="sr-only">Tampilan peran</span><select value={route.role} onChange={(event) => { const nextRole = event.target.value; window.location.hash = getNavigation(nextRole)[0].hash; }} aria-label="Pilih tampilan peran"><option value={currentRole.id}>{currentRole.label}</option>{roleOptions.filter((role) => role.id !== currentRole.id).map((role) => <option key={role.id} value={role.id}>{role.label}</option>)}</select><span aria-hidden="true">⌄</span></label>
            <button className="icon-button notification-button" aria-label="Notifikasi" type="button"><span aria-hidden="true">♧</span><i /></button>
            <button className="profile-button" type="button" aria-label="Profil pengguna"><span className="profile-avatar">AD</span><span className="profile-copy"><strong>{route.role === 'admin' ? 'Admin Demo' : currentRole.label}</strong><small>{currentRole.label}</small></span><span className="profile-chevron" aria-hidden="true">⌄</span></button>
          </div>
        </header>

        <main id="main-content" className="main-content">
          <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> PORTAL EKSTRAKURIKULER</div><h1>{getPageTitle(route.active.label)}</h1><p>Kelola dan pantau kegiatan ekstrakurikuler sekolah dalam satu tempat.</p></div><div className="page-context"><span className="context-icon" aria-hidden="true">◷</span><span><small>TAHUN AJARAN</small><strong>2025 / 2026</strong></span></div></div>
          {route.active.hash === '#/admin/dashboard' && <AdminDashboard activities={activities} registrations={registrations} />}
          {route.active.hash === '#/siswa/beranda' && <StudentHome activities={activities} registrations={registrations} />}
          {route.active.hash === '#/pembina/dashboard' && <CoachDashboard activities={activities} attendanceRecords={attendanceRecords} assessmentRecords={assessmentRecords} />}
          {route.active.hash === '#/pembina/kegiatan' && <CoachActivities activities={activities} />}
          {route.active.hash === '#/kepala-sekolah/ringkasan' && <PrincipalSummary activities={activities} registrations={registrations} attendanceRecords={attendanceRecords} assessmentRecords={assessmentRecords} />}
          {route.active.hash === '#/admin/ekstrakurikuler' && <ExtracurricularPage activities={activities} setActivities={setActivities} />}
          {route.active.hash.endsWith('/jadwal') && <SchedulePage activities={activities} role={route.role} />}
          {route.active.hash === '#/admin/pendaftaran' && <RegistrationPage view="admin" activities={activities} registrations={registrations} />}
          {route.active.hash === '#/siswa/ekstrakurikuler' && <RegistrationPage view="browse" activities={activities} registrations={registrations} onRegister={onRegister} />}
          {route.active.hash === '#/siswa/pendaftaran' && <RegistrationPage view="mine" registrations={registrations} />}
          {route.active.hash === '#/pembina/absensi' && <AttendancePage activities={activities} records={attendanceRecords} onSave={onSaveAttendance} />}
          {route.active.hash === '#/pembina/penilaian' && <AssessmentPage view="coach" activities={activities} records={assessmentRecords} onSave={onSaveAssessment} />}
          {route.active.hash === '#/siswa/penilaian' && <AssessmentPage view="student" records={assessmentRecords} />}
          {route.active.hash === '#/siswa/absensi' && <StudentAttendancePage records={attendanceRecords} />}
          {['#/admin/laporan', '#/kepala-sekolah/laporan'].includes(route.active.hash) && <ReportsPage activities={activities} registrations={registrations} attendanceRecords={attendanceRecords} assessmentRecords={assessmentRecords} />}
          {!['#/admin/dashboard', '#/admin/ekstrakurikuler', '#/admin/pendaftaran', '#/siswa/beranda', '#/siswa/ekstrakurikuler', '#/siswa/pendaftaran', '#/siswa/penilaian', '#/siswa/absensi', '#/pembina/dashboard', '#/pembina/kegiatan', '#/pembina/absensi', '#/pembina/penilaian', '#/kepala-sekolah/ringkasan', '#/admin/laporan', '#/kepala-sekolah/laporan'].includes(route.active.hash) && !route.active.hash.endsWith('/jadwal') && <section className="phase-placeholder" aria-live="polite"><div className="placeholder-icon" aria-hidden="true">✳</div><div><span className="placeholder-tag">FONDASI PROYEK</span><h2>Ruang kerja {getPageTitle(route.active.label)}</h2><p>Halaman ini akan dibangun pada fase implementasi berikutnya.</p></div></section>}
          <footer className="page-footer"><span>Ruang Ekskul <span className="footer-dot">·</span> Portal manajemen ekstrakurikuler</span><span>Data demonstrasi</span></footer>
        </main>
      </div>
    </div>
  );
}
