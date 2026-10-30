import { useEffect, useMemo, useState } from 'react';
import { Button } from '../../components/ui/Button.jsx';
import { DataTable } from '../../components/ui/DataTable.jsx';
import { FormField } from '../../components/ui/FormField.jsx';
import { EmptyState } from '../../components/feedback/EmptyState.jsx';
import { assessmentPeriods } from '../../data/mock/assessments.js';
import { demoStudents } from '../../data/mock/attendance.js';

const studentId = 'siswa-demo-01';
const scoreDimensions = [
  { key: 'skills', label: 'Keterampilan' },
  { key: 'discipline', label: 'Kedisiplinan' },
  { key: 'participation', label: 'Keaktifan' },
];

function StudentAssessments({ records }) {
  const [period, setPeriod] = useState(assessmentPeriods[0]);
  const ownRecords = records.filter((record) => record.studentId === studentId && record.period === period);

  return (
    <div className="feature-page">
      <section className="feature-panel assessment-panel" aria-labelledby="student-assessment-title">
        <div className="feature-panel__heading"><div><h2 id="student-assessment-title">Penilaian Saya</h2><p>Penilaian kegiatan untuk Siswa Demo 01.</p></div><label className="attendance-period"><span className="sr-only">Periode nilai</span><select className="ui-input" value={period} onChange={(event) => setPeriod(event.target.value)}>{assessmentPeriods.map((item) => <option key={item}>{item}</option>)}</select></label></div>
        {ownRecords.length ? <div className="student-assessment-list">{ownRecords.map((record) => (
          <article className="student-assessment-card" key={record.id}>
            <div className="student-assessment-card__heading"><div><h3>{record.activityName}</h3><span>{record.period}</span></div></div>
            <dl className="assessment-score-grid">{scoreDimensions.map((dimension) => <div key={dimension.key}><dt>{dimension.label}</dt><dd>{record[dimension.key]}<span> / 100</span></dd></div>)}</dl>
            {record.note && <p className="assessment-note"><strong>Catatan perkembangan</strong>{record.note}</p>}
          </article>
        ))}</div> : <EmptyState title="Belum ada penilaian" message={`Penilaian untuk ${period.toLocaleLowerCase('id')} akan muncul di sini setelah dicatat oleh pembina.`} />}
        <p className="demo-note"><span aria-hidden="true">ⓘ</span> Nilai dan catatan pada halaman ini adalah data demonstrasi.</p>
      </section>
    </div>
  );
}

function CoachAssessmentForm({ activities, records, onSave }) {
  const availableActivities = activities.filter((activity) => activity.active && !activity.archived);
  const [activityId, setActivityId] = useState(() => availableActivities[0]?.id ?? '');
  const [selectedStudentId, setSelectedStudentId] = useState(demoStudents[0].id);
  const [period, setPeriod] = useState(assessmentPeriods[0]);
  const [scores, setScores] = useState({ skills: '', discipline: '', participation: '', note: '' });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const selectedActivity = availableActivities.find((activity) => activity.id === activityId);
  const selectedStudent = demoStudents.find((student) => student.id === selectedStudentId);
  const currentAssessment = useMemo(() => records.find((record) => record.activityId === activityId && record.studentId === selectedStudentId && record.period === period), [records, activityId, selectedStudentId, period]);

  useEffect(() => {
    setScores(currentAssessment ? {
      skills: String(currentAssessment.skills),
      discipline: String(currentAssessment.discipline),
      participation: String(currentAssessment.participation),
      note: currentAssessment.note ?? '',
    } : { skills: '', discipline: '', participation: '', note: '' });
    setError('');
  }, [currentAssessment]);

  function submitAssessment(event) {
    event.preventDefault();
    const invalidScore = scoreDimensions.find(({ key }) => !Number.isInteger(Number(scores[key])) || Number(scores[key]) < 1 || Number(scores[key]) > 100);
    if (!selectedActivity || !selectedStudent || invalidScore) {
      setError(invalidScore ? `${invalidScore.label} harus berupa bilangan bulat dari 1 sampai 100.` : 'Pilih kegiatan dan siswa yang valid.');
      return;
    }
    onSave({
      activityId,
      activityName: selectedActivity.name,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      period,
      skills: Number(scores.skills),
      discipline: Number(scores.discipline),
      participation: Number(scores.participation),
      note: scores.note.trim(),
    });
    setNotice(`Penilaian ${selectedStudent.name} untuk ${period.toLocaleLowerCase('id')} tersimpan pada sesi demo.`);
  }

  const activityHistory = records.filter((record) => record.activityId === activityId && record.period === period);
  const columns = [
    { key: 'studentName', header: 'SISWA' },
    ...scoreDimensions.map((dimension) => ({ key: dimension.key, header: dimension.label.toLocaleUpperCase('id'), align: 'center' })),
    { key: 'note', header: 'CATATAN', render: (record) => record.note || '—' },
  ];

  return (
    <div className="feature-page">
      <section className="feature-panel assessment-panel" aria-labelledby="coach-assessment-title">
        <div className="feature-panel__heading"><div><h2 id="coach-assessment-title">Input penilaian</h2><p>Masukkan nilai per dimensi untuk kegiatan dan semester yang dipilih.</p></div><span className="feature-panel__count">Skala 1–100</span></div>
        {availableActivities.length ? <>
          <form className="assessment-form" onSubmit={submitAssessment} noValidate>
            <div className="attendance-session-fields assessment-selectors">
              <label className="ui-field"><span className="ui-field__label">Kegiatan</span><select className="ui-input" value={activityId} onChange={(event) => setActivityId(event.target.value)} aria-label="Pilih kegiatan">{availableActivities.map((activity) => <option value={activity.id} key={activity.id}>{activity.name}</option>)}</select></label>
              <label className="ui-field"><span className="ui-field__label">Siswa</span><select className="ui-input" value={selectedStudentId} onChange={(event) => setSelectedStudentId(event.target.value)} aria-label="Pilih siswa">{demoStudents.map((student) => <option value={student.id} key={student.id}>{student.name}</option>)}</select></label>
              <label className="ui-field"><span className="ui-field__label">Periode</span><select className="ui-input" value={period} onChange={(event) => setPeriod(event.target.value)} aria-label="Pilih periode penilaian">{assessmentPeriods.map((item) => <option key={item}>{item}</option>)}</select></label>
            </div>
            <div className="assessment-score-inputs">{scoreDimensions.map((dimension) => <FormField key={dimension.key} label={dimension.label} type="number" name={dimension.key} min="1" max="100" step="1" value={scores[dimension.key]} onChange={(event) => { setScores((current) => ({ ...current, [dimension.key]: event.target.value })); setError(''); setNotice(''); }} placeholder="1–100" required />)}</div>
            <label className="ui-field"><span className="ui-field__label">Catatan perkembangan <span className="ui-field__optional">Opsional · maks. 500 karakter</span></span><textarea className="ui-input assessment-textarea" maxLength="500" rows="3" value={scores.note} onChange={(event) => { setScores((current) => ({ ...current, note: event.target.value })); setNotice(''); }} placeholder="Catatan perkembangan siswa" /></label>
            {error && <p className="activity-form__error" role="alert">{error}</p>}
            {notice && <p className="activity-notice" role="status">{notice}</p>}
            <div className="assessment-save-row"><p>Nilai keterampilan, kedisiplinan, dan keaktifan disimpan terpisah.</p><Button type="submit">{currentAssessment ? 'Simpan perubahan' : 'Simpan penilaian'}</Button></div>
          </form>
          <div className="assessment-history"><div className="attendance-roster__heading"><strong>Riwayat penilaian kegiatan</strong><span>{period}</span></div>{activityHistory.length ? <DataTable columns={columns} rows={activityHistory} caption="Riwayat penilaian demonstrasi" /> : <EmptyState title="Belum ada penilaian" message={`Catatan untuk ${period.toLocaleLowerCase('id')} akan tampil di sini.`} />}</div>
        </> : <EmptyState title="Belum ada kegiatan aktif" message="Kegiatan aktif akan tersedia untuk penilaian." />}
        <p className="demo-note"><span aria-hidden="true">ⓘ</span> Nilai dan catatan hanya tersimpan sebagai data demonstrasi selama sesi aplikasi.</p>
      </section>
    </div>
  );
}

export function AssessmentPage({ view, activities, records, onSave }) {
  return view === 'student' ? <StudentAssessments records={records} /> : <CoachAssessmentForm activities={activities} records={records} onSave={onSave} />;
}
