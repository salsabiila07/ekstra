import { useMemo, useState } from 'react';
import { Button } from '../../components/ui/Button.jsx';
import { DataTable } from '../../components/ui/DataTable.jsx';
import { Dialog } from '../../components/ui/Dialog.jsx';
import { EmptyState } from '../../components/feedback/EmptyState.jsx';
import { StatusBadge } from '../../components/ui/StatusBadge.jsx';

const DEMO_STUDENT = 'Siswa Demo 01';

function getAcceptedCount(registrations, activityId) {
  return registrations.filter((registration) => registration.activityId === activityId && registration.status === 'Diterima').length;
}

function StudentActivityList({ activities, registrations, onRegister }) {
  const [query, setQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const registeredIds = useMemo(() => new Set(registrations.filter((registration) => registration.student === DEMO_STUDENT).map((registration) => registration.activityId)), [registrations]);
  const availableActivities = activities.filter((activity) => activity.active && !activity.archived);
  const filteredActivities = availableActivities.filter((activity) => `${activity.name} ${activity.description} ${activity.advisor}`.toLocaleLowerCase('id').includes(query.trim().toLocaleLowerCase('id')));

  function confirmRegistration() {
    if (!selectedActivity) return;
    setError('');
    if (registeredIds.has(selectedActivity.id)) {
      setError('Anda sudah terdaftar pada kegiatan ini.');
      return;
    }
    if (selectedActivity.capacity && getAcceptedCount(registrations, selectedActivity.id) >= selectedActivity.capacity) {
      setError('Kapasitas kegiatan sudah terpenuhi.');
      return;
    }
    onRegister(selectedActivity);
    setNotice(`Pendaftaran ${selectedActivity.name} diterima. Status kegiatan tersedia pada menu Pendaftaran Saya.`);
    setSelectedActivity(null);
  }

  return (
    <>
      <section className="feature-panel registration-panel" aria-labelledby="browse-activities-title">
        <div className="feature-panel__heading registration-heading"><div><h2 id="browse-activities-title">Jelajahi ekstrakurikuler</h2><p>Pendaftaran langsung diterima selama kegiatan masih memiliki kapasitas.</p></div><span className="feature-panel__count">{filteredActivities.length} kegiatan tersedia</span></div>
        <label className="activity-search registration-search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama kegiatan, deskripsi, atau pembina" aria-label="Cari ekstrakurikuler" /></label>
        {notice && <p className="activity-notice" role="status">{notice}<button type="button" aria-label="Tutup pesan" onClick={() => setNotice('')}>×</button></p>}
        {filteredActivities.length ? <div className="registration-cards">{filteredActivities.map((activity) => {
          const acceptedCount = getAcceptedCount(registrations, activity.id);
          const full = Boolean(activity.capacity && acceptedCount >= activity.capacity);
          const alreadyRegistered = registeredIds.has(activity.id);
          return (
            <article className="registration-card" key={activity.id}>
              <div className="registration-card__top"><span className="registration-card__icon" aria-hidden="true">◇</span><StatusBadge status={full ? 'Penuh' : 'Tersedia'} tone={full ? 'danger' : 'success'} /></div>
              <h3>{activity.name}</h3><p className="registration-card__description">{activity.description}</p>
              <dl className="registration-card__details"><div><dt>Pembina</dt><dd>{activity.advisor}</dd></div><div><dt>Jadwal</dt><dd>{activity.day}, {activity.time}</dd></div><div><dt>Lokasi</dt><dd>{activity.location}</dd></div><div><dt>Kapasitas</dt><dd>{activity.capacity ? `${acceptedCount} / ${activity.capacity} peserta` : 'Tidak dibatasi'}</dd></div></dl>
              <Button variant={alreadyRegistered || full ? 'secondary' : 'primary'} disabled={alreadyRegistered || full} onClick={() => { setError(''); setSelectedActivity(activity); }}>{alreadyRegistered ? 'Sudah terdaftar' : full ? 'Kapasitas penuh' : 'Daftar kegiatan'}</Button>
            </article>
          );
        })}</div> : <EmptyState title="Tidak ada kegiatan tersedia" message="Coba kata kunci lain atau periksa kembali nanti." />}
        <p className="demo-note"><span aria-hidden="true">ⓘ</span> Pendaftaran ini memakai identitas Siswa Demo 01 dan hanya tersimpan selama sesi aplikasi berlangsung.</p>
      </section>
      <Dialog open={Boolean(selectedActivity)} onClose={() => setSelectedActivity(null)} title="Konfirmasi pendaftaran" description="Pendaftaran akan langsung diterima jika kuota masih tersedia.">
        {selectedActivity && <div className="registration-confirm"><p>Daftarkan <strong>Siswa Demo 01</strong> ke kegiatan <strong>{selectedActivity.name}</strong>?</p><p className="registration-confirm__schedule">{selectedActivity.day}, {selectedActivity.time} · {selectedActivity.location}</p>{error && <p className="activity-form__error" role="alert">{error}</p>}<div className="activity-form__actions"><Button variant="secondary" onClick={() => setSelectedActivity(null)}>Batal</Button><Button onClick={confirmRegistration}>Kirim pendaftaran</Button></div></div>}
      </Dialog>
    </>
  );
}

function StudentRegistrationList({ registrations }) {
  const ownRegistrations = registrations.filter((registration) => registration.student === DEMO_STUDENT);
  return (
    <section className="feature-panel registration-panel" aria-labelledby="my-registrations-title">
      <div className="feature-panel__heading"><div><h2 id="my-registrations-title">Pendaftaran Saya</h2><p>Daftar kegiatan yang didaftarkan oleh Siswa Demo 01.</p></div><span className="feature-panel__count">{ownRegistrations.length} pendaftaran</span></div>
      {ownRegistrations.length ? <div className="registration-own-list">{ownRegistrations.map((registration) => <article className="registration-own-item" key={registration.id}><span className="registration-card__icon" aria-hidden="true">◇</span><span className="registration-own-copy"><strong>{registration.activityName}</strong><small>Dikirim {registration.submittedAt}</small></span><StatusBadge status={registration.status} /></article>)}</div> : <EmptyState title="Belum ada pendaftaran" message="Jelajahi ekstrakurikuler untuk menemukan kegiatan dan mendaftar." action={<a className="ui-button ui-button--primary" href="#/siswa/ekstrakurikuler">Jelajahi kegiatan</a>} />}
      <p className="demo-note"><span aria-hidden="true">ⓘ</span> Status pada halaman ini adalah data demonstrasi untuk Siswa Demo 01.</p>
    </section>
  );
}

function AdminRegistrationList({ registrations, activities }) {
  const activityNameById = new Map(activities.map((activity) => [activity.id, activity.name]));
  const columns = [
    { key: 'student', header: 'SISWA' },
    { key: 'activityName', header: 'EKSTRAKURIKULER', render: (registration) => activityNameById.get(registration.activityId) ?? registration.activityName },
    { key: 'submittedAt', header: 'TANGGAL DAFTAR' },
    { key: 'status', header: 'STATUS', render: (registration) => <StatusBadge status={registration.status} /> },
  ];

  return (
    <section className="feature-panel registration-panel" aria-labelledby="all-registrations-title">
      <div className="feature-panel__heading"><div><h2 id="all-registrations-title">Daftar pendaftaran</h2><p>Pendaftaran yang masuk diterima langsung bila kuota tersedia.</p></div><span className="feature-panel__count">{registrations.length} pendaftaran</span></div>
      {registrations.length ? <DataTable columns={columns} rows={registrations} caption="Daftar pendaftaran demonstrasi" /> : <EmptyState title="Belum ada pendaftaran" message="Pendaftaran siswa akan ditampilkan di sini." />}
      <p className="demo-note"><span aria-hidden="true">ⓘ</span> Data pendaftaran adalah data demonstrasi dan hanya bertahan selama sesi aplikasi.</p>
    </section>
  );
}

export function RegistrationPage({ view, activities, registrations, onRegister }) {
  if (view === 'browse') return <div className="feature-page"><StudentActivityList activities={activities} registrations={registrations} onRegister={onRegister} /></div>;
  if (view === 'mine') return <div className="feature-page"><StudentRegistrationList registrations={registrations} /></div>;
  return <div className="feature-page"><AdminRegistrationList registrations={registrations} activities={activities} /></div>;
}
