import { useMemo, useState } from 'react';
import { Button } from '../../components/ui/Button.jsx';
import { DataTable } from '../../components/ui/DataTable.jsx';
import { EmptyState } from '../../components/feedback/EmptyState.jsx';
import { StatCard } from '../../components/ui/StatCard.jsx';
import { StatusBadge } from '../../components/ui/StatusBadge.jsx';
import { assessmentPeriods } from '../../data/mock/assessments.js';
import { attendanceStatuses } from '../../data/mock/attendance.js';

function formatDate(date) {
  if (!date) return 'Semua tanggal';
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T00:00:00`));
}

export function ReportsPage({ activities, registrations, attendanceRecords, assessmentRecords }) {
  const [activityId, setActivityId] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [period, setPeriod] = useState(assessmentPeriods[0]);
  const [generatedAt, setGeneratedAt] = useState(() => new Date());

  const dateError = fromDate && toDate && fromDate > toDate ? 'Tanggal awal harus sama atau sebelum tanggal akhir.' : '';
  const inDateRange = (date) => (!fromDate || date >= fromDate) && (!toDate || date <= toDate);
  const matchesActivity = (id) => activityId === 'all' || id === activityId;

  const filteredRegistrations = useMemo(() => registrations.filter((record) => matchesActivity(record.activityId) && inDateRange(record.submittedAt) && record.status === 'Diterima'), [registrations, activityId, fromDate, toDate]);
  const filteredAttendance = useMemo(() => attendanceRecords.filter((record) => matchesActivity(record.activityId) && inDateRange(record.date)), [attendanceRecords, activityId, fromDate, toDate]);
  const filteredAssessments = useMemo(() => assessmentRecords.filter((record) => matchesActivity(record.activityId) && record.period === period), [assessmentRecords, activityId, period]);
  const participantCounts = activities.filter((activity) => activityId === 'all' || activity.id === activityId).map((activity) => ({
    id: activity.id,
    activityName: activity.name,
    participants: filteredRegistrations.filter((registration) => registration.activityId === activity.id).length,
  }));
  const statusCounts = attendanceStatuses.map((status) => ({ status, count: filteredAttendance.filter((record) => record.status === status).length }));
  const attendanceRate = filteredAttendance.length ? Math.round((filteredAttendance.filter((record) => record.status === 'Hadir').length / filteredAttendance.length) * 100) : null;
  const averageParticipation = filteredAssessments.length ? (filteredAssessments.reduce((total, record) => total + record.participation, 0) / filteredAssessments.length).toFixed(1) : null;

  const participantColumns = [
    { key: 'activityName', header: 'EKSTRAKURIKULER' },
    { key: 'participants', header: 'PESERTA DITERIMA', align: 'right' },
  ];
  const attendanceColumns = [
    { key: 'status', header: 'STATUS KEHADIRAN', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'count', header: 'JUMLAH CATATAN', align: 'right' },
  ];
  const assessmentColumns = [
    { key: 'studentName', header: 'SISWA' },
    { key: 'activityName', header: 'EKSTRAKURIKULER' },
    { key: 'skills', header: 'KETERAMPILAN', align: 'center' },
    { key: 'discipline', header: 'KEDISIPLINAN', align: 'center' },
    { key: 'participation', header: 'KEAKTIFAN', align: 'center' },
    { key: 'note', header: 'CATATAN', render: (row) => row.note || '—' },
  ];

  function printReport() {
    setGeneratedAt(new Date());
    window.setTimeout(() => window.print(), 0);
  }

  return (
    <div className="feature-page reports-page">
      <section className="report-filter-panel" aria-labelledby="report-filter-title">
        <div className="report-toolbar"><div><h2 id="report-filter-title">Filter laporan</h2><p>Atur data yang akan ditinjau atau dicetak.</p></div><div className="report-actions"><Button variant="secondary" onClick={() => { setActivityId('all'); setFromDate(''); setToDate(''); setPeriod(assessmentPeriods[0]); }}>Reset filter</Button><Button onClick={printReport}><span aria-hidden="true">▣</span> Cetak / Simpan PDF</Button></div></div>
        <div className="report-filter-grid">
          <label className="ui-field"><span className="ui-field__label">Ekstrakurikuler</span><select className="ui-input" value={activityId} onChange={(event) => setActivityId(event.target.value)}><option value="all">Semua kegiatan</option>{activities.map((activity) => <option key={activity.id} value={activity.id}>{activity.name}{activity.archived ? ' (Diarsipkan)' : ''}</option>)}</select></label>
          <label className="ui-field"><span className="ui-field__label">Dari tanggal</span><input className="ui-input" type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} /></label>
          <label className="ui-field"><span className="ui-field__label">Sampai tanggal</span><input className="ui-input" type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} /></label>
          <label className="ui-field"><span className="ui-field__label">Periode penilaian</span><select className="ui-input" value={period} onChange={(event) => setPeriod(event.target.value)}>{assessmentPeriods.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        <p className="report-filter-hint">Rentang tanggal memfilter pendaftaran dan absensi. Penilaian difilter berdasarkan semester.</p>
        {dateError && <p className="activity-form__error" role="alert">{dateError}</p>}
      </section>

      <header className="report-document-header"><div><span className="eyebrow"><span className="eyebrow-dot" /> LAPORAN DEMONSTRASI</span><h2>Rekap Ekstrakurikuler</h2><p>{activityId === 'all' ? 'Semua kegiatan' : activities.find((activity) => activity.id === activityId)?.name} <span>·</span> {formatDate(fromDate)} — {formatDate(toDate)} <span>·</span> {period}</p></div><small>Dibuat {new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(generatedAt)}</small></header>

      <section className="report-stats" aria-label="Ringkasan laporan">
        <StatCard label="Peserta diterima" value={filteredRegistrations.length} icon="♙" tone="blue" detail="Berdasarkan pendaftaran demo yang diterima" />
        <StatCard label="Catatan absensi" value={filteredAttendance.length} icon="▤" tone="pink" detail="Sesuai kegiatan dan rentang tanggal" />
        <StatCard label="Kehadiran" value={attendanceRate === null ? '—' : `${attendanceRate}%`} icon="✓" tone="green" detail="Hadir dari seluruh catatan absensi terfilter" />
        <StatCard label="Rata-rata keaktifan" value={averageParticipation === null ? '—' : averageParticipation} icon="✳" tone="amber" detail={`Skala 1–100 · ${period}`} />
      </section>

      <section className="feature-panel report-section" aria-labelledby="participant-report-title"><div className="feature-panel__heading"><div><h2 id="participant-report-title">Rekap peserta per ekstrakurikuler</h2><p>Jumlah pendaftaran berstatus diterima dalam rentang tanggal terpilih.</p></div></div>{participantCounts.length ? <DataTable columns={participantColumns} rows={participantCounts} caption="Rekap peserta demonstrasi" /> : <EmptyState title="Tidak ada kegiatan" message="Data kegiatan akan ditampilkan di sini." />}</section>

      <section className="feature-panel report-section" aria-labelledby="attendance-report-title"><div className="feature-panel__heading"><div><h2 id="attendance-report-title">Rekap absensi</h2><p>Jumlah catatan untuk setiap status dalam rentang tanggal terpilih.</p></div><span className="feature-panel__count">{filteredAttendance.length} catatan</span></div>{filteredAttendance.length ? <DataTable columns={attendanceColumns} rows={statusCounts} caption="Rekap status absensi demonstrasi" /> : <EmptyState title="Belum ada absensi pada filter ini" message="Catatan absensi yang sesuai filter akan ditampilkan di sini." />}</section>

      <section className="feature-panel report-section" aria-labelledby="assessment-report-title"><div className="feature-panel__heading"><div><h2 id="assessment-report-title">Penilaian dan keaktifan</h2><p>Nilai dimensi disajikan terpisah sesuai periode yang dipilih.</p></div><span className="feature-panel__count">{filteredAssessments.length} penilaian</span></div>{filteredAssessments.length ? <DataTable columns={assessmentColumns} rows={filteredAssessments} caption="Rekap penilaian demonstrasi" /> : <EmptyState title="Belum ada penilaian pada filter ini" message={`Catatan penilaian untuk ${period.toLocaleLowerCase('id')} akan ditampilkan di sini.`} />}</section>
      <p className="demo-note report-demo-note"><span aria-hidden="true">ⓘ</span> Laporan ini dihitung dari data demonstrasi. Gunakan Cetak / Simpan PDF untuk membuka dialog cetak browser.</p>
    </div>
  );
}
