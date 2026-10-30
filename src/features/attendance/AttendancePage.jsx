import { useEffect, useMemo, useState } from 'react';
import { Button } from '../../components/ui/Button.jsx';
import { DataTable } from '../../components/ui/DataTable.jsx';
import { EmptyState } from '../../components/feedback/EmptyState.jsx';
import { StatusBadge } from '../../components/ui/StatusBadge.jsx';
import { attendanceStatuses, demoStudents } from '../../data/mock/attendance.js';

function getToday() {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

export function AttendancePage({ activities, records, onSave }) {
  const availableActivities = activities.filter((activity) => activity.active && !activity.archived);
  const [activityId, setActivityId] = useState(() => availableActivities[0]?.id ?? '');
  const [date, setDate] = useState(getToday);
  const [draft, setDraft] = useState({});
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const existing = records.filter((record) => record.activityId === activityId && record.date === date);
    setDraft(Object.fromEntries(existing.map((record) => [record.studentId, record.status])));
  }, [activityId, date, records]);

  const selectedActivity = availableActivities.find((activity) => activity.id === activityId);
  const sessionRecords = records.filter((record) => record.activityId === activityId && record.date === date);
  const history = useMemo(() => records.filter((record) => record.activityId === activityId).slice().sort((a, b) => b.date.localeCompare(a.date)), [records, activityId]);
  const complete = Boolean(date) && demoStudents.every((student) => attendanceStatuses.includes(draft[student.id]));
  const statusCounts = Object.fromEntries(attendanceStatuses.map((status) => [status, demoStudents.filter((student) => draft[student.id] === status).length]));

  function saveAttendance() {
    if (!selectedActivity || !complete) return;
    onSave({ activityId, activityName: selectedActivity.name, date, statuses: draft });
    setNotice(`Absensi ${selectedActivity.name} tanggal ${date} tersimpan pada sesi demo.`);
  }

  const columns = [
    { key: 'studentName', header: 'SISWA' },
    { key: 'date', header: 'TANGGAL' },
    { key: 'status', header: 'STATUS', render: (record) => <StatusBadge status={record.status} /> },
  ];

  return (
    <div className="feature-page attendance-page">
      <section className="feature-panel" aria-labelledby="attendance-entry-title">
        <div className="feature-panel__heading"><div><h2 id="attendance-entry-title">Catat kehadiran</h2><p>Pilih kegiatan dan tanggal pertemuan, lalu tentukan status setiap siswa.</p></div><span className="feature-panel__count">Data demonstrasi</span></div>
        <div className="attendance-session-fields">
          <label className="ui-field"><span className="ui-field__label">Kegiatan</span><select className="ui-input" value={activityId} onChange={(event) => { setActivityId(event.target.value); setNotice(''); }} aria-label="Pilih kegiatan"><option value="" disabled>Pilih kegiatan</option>{availableActivities.map((activity) => <option value={activity.id} key={activity.id}>{activity.name}</option>)}</select></label>
          <label className="ui-field"><span className="ui-field__label">Tanggal pertemuan</span><input className="ui-input" type="date" value={date} onChange={(event) => { setDate(event.target.value); setNotice(''); }} aria-label="Pilih tanggal pertemuan" /></label>
        </div>
        {availableActivities.length ? <>
          <div className="attendance-summary" aria-label="Ringkasan status kehadiran">
            {attendanceStatuses.map((status) => <div className="attendance-summary__item" key={status}><StatusBadge status={status} /><strong>{statusCounts[status]}</strong></div>)}
          </div>
          <div className="attendance-roster">
            <div className="attendance-roster__heading"><strong>Daftar siswa</strong><span>{sessionRecords.length ? 'Pilih status untuk memperbarui absensi tersimpan.' : 'Pilih status untuk semua siswa sebelum menyimpan.'}</span></div>
            {demoStudents.map((student) => <div className="attendance-row" key={student.id}><span className="attendance-row__student"><span className="attendance-avatar" aria-hidden="true">{student.id.slice(-2)}</span><strong>{student.name}</strong></span><label className="attendance-row__field"><span className="sr-only">Status {student.name}</span><select className="attendance-select" value={draft[student.id] ?? ''} onChange={(event) => { setDraft((current) => ({ ...current, [student.id]: event.target.value })); setNotice(''); }}><option value="" disabled>Pilih status</option>{attendanceStatuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></label></div>)}
          </div>
          <div className="attendance-save-row"><span className="attendance-save-hint">{complete ? 'Semua status sudah dipilih.' : 'Lengkapi status untuk seluruh siswa.'}</span><Button onClick={saveAttendance} disabled={!complete || !selectedActivity}>Simpan absensi</Button></div>
          {notice && <p className="activity-notice" role="status">{notice}</p>}
        </> : <EmptyState title="Belum ada kegiatan aktif" message="Kegiatan aktif akan tersedia untuk pencatatan absensi." />}
      </section>
      <section className="feature-panel" aria-labelledby="attendance-history-title">
        <div className="feature-panel__heading"><div><h2 id="attendance-history-title">Riwayat absensi</h2><p>{selectedActivity ? `Catatan tersimpan untuk ${selectedActivity.name}.` : 'Catatan absensi yang tersimpan.'}</p></div><span className="feature-panel__count">{history.length} catatan</span></div>
        {history.length ? <DataTable columns={columns} rows={history} caption="Riwayat absensi demonstrasi" /> : <EmptyState title="Belum ada riwayat absensi" message="Absensi yang tersimpan untuk kegiatan ini akan muncul di sini." />}
      </section>
      <p className="demo-note"><span aria-hidden="true">ⓘ</span> Nama siswa dan catatan pada halaman ini adalah data demonstrasi. Penyimpanan hanya berlangsung selama sesi aplikasi.</p>
    </div>
  );
}

export function StudentAttendancePage({ records }) {
  const studentRecords = records.filter((record) => record.studentId === 'siswa-demo-01').slice().sort((first, second) => second.date.localeCompare(first.date));
  const counts = Object.fromEntries(attendanceStatuses.map((status) => [status, studentRecords.filter((record) => record.status === status).length]));
  const columns = [
    { key: 'activityName', header: 'EKSTRAKURIKULER' },
    { key: 'date', header: 'TANGGAL' },
    { key: 'status', header: 'STATUS', render: (record) => <StatusBadge status={record.status} /> },
  ];

  return (
    <div className="feature-page attendance-page">
      <section className="feature-panel" aria-labelledby="student-attendance-title">
        <div className="feature-panel__heading"><div><h2 id="student-attendance-title">Riwayat absensi Saya</h2><p>Catatan kehadiran untuk Siswa Demo 01.</p></div><span className="feature-panel__count">{studentRecords.length} catatan</span></div>
        <div className="attendance-summary" aria-label="Ringkasan absensi saya">{attendanceStatuses.map((status) => <div className="attendance-summary__item" key={status}><StatusBadge status={status} /><strong>{counts[status]}</strong></div>)}</div>
        {studentRecords.length ? <DataTable columns={columns} rows={studentRecords} caption="Riwayat absensi Siswa Demo 01" /> : <EmptyState title="Belum ada riwayat absensi" message="Riwayat kehadiran Anda akan muncul di sini setelah dicatat oleh pembina." />}
        <p className="demo-note"><span aria-hidden="true">ⓘ</span> Tampilan siswa dan seluruh catatan merupakan simulasi data demonstrasi.</p>
      </section>
    </div>
  );
}
