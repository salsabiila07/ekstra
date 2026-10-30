import { useMemo, useState } from 'react';
import { Button } from '../../components/ui/Button.jsx';
import { DataTable } from '../../components/ui/DataTable.jsx';
import { Dialog } from '../../components/ui/Dialog.jsx';
import { FormField } from '../../components/ui/FormField.jsx';
import { StatusBadge } from '../../components/ui/StatusBadge.jsx';
import { EmptyState } from '../../components/feedback/EmptyState.jsx';

const blankForm = { name: '', description: '', advisor: '', day: '', time: '', location: '', capacity: '', active: true };

function ActivityForm({ activity, activities, onSave, onCancel }) {
  const [form, setForm] = useState(() => activity ? { ...activity, capacity: activity.capacity ?? '' } : blankForm);
  const [error, setError] = useState('');

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const duplicate = activities.some((item) => item.name.trim().toLocaleLowerCase('id') === form.name.trim().toLocaleLowerCase('id') && item.id !== activity?.id);
    if (!form.name.trim() || !form.description.trim() || !form.advisor.trim() || !form.day.trim() || !form.time.trim() || !form.location.trim()) {
      setError('Lengkapi semua informasi wajib sebelum menyimpan.');
      return;
    }
    if (duplicate) {
      setError('Nama ekstrakurikuler sudah digunakan. Gunakan nama lain.');
      return;
    }
    if (form.capacity && (!Number.isInteger(Number(form.capacity)) || Number(form.capacity) < 1)) {
      setError('Kapasitas harus berupa bilangan bulat lebih dari 0.');
      return;
    }
    onSave({ ...form, capacity: form.capacity ? Number(form.capacity) : null });
  }

  return (
    <form className="activity-form" onSubmit={handleSubmit} noValidate>
      <FormField label="Nama ekstrakurikuler" name="name" value={form.name} onChange={updateField} placeholder="Contoh: Klub Sains" required autoFocus />
      <div className="ui-field"><label className="ui-field__label" htmlFor="activity-description">Deskripsi <span className="ui-field__required" aria-hidden="true">*</span></label><textarea id="activity-description" className="ui-input activity-textarea" name="description" rows="3" value={form.description} onChange={updateField} placeholder="Ringkasan kegiatan" required /></div>
      <FormField label="Pembina" name="advisor" value={form.advisor} onChange={updateField} placeholder="Nama pembina" required />
      <div className="activity-form__row"><FormField label="Hari" name="day" value={form.day} onChange={updateField} placeholder="Contoh: Senin" required /><FormField label="Jam" name="time" value={form.time} onChange={updateField} placeholder="14.00–16.00" required /></div>
      <div className="activity-form__row"><FormField label="Lokasi" name="location" value={form.location} onChange={updateField} placeholder="Lokasi kegiatan" required /><FormField label="Kapasitas (opsional)" name="capacity" type="number" min="1" step="1" value={form.capacity} onChange={updateField} placeholder="Tidak dibatasi" /></div>
      <label className="activity-active-toggle"><input type="checkbox" name="active" checked={form.active} onChange={updateField} /><span><strong>Status aktif</strong><small>Kegiatan aktif ditampilkan sebagai tersedia.</small></span></label>
      {error && <p className="activity-form__error" role="alert">{error}</p>}
      <div className="activity-form__actions"><Button variant="secondary" onClick={onCancel}>Batal</Button><Button type="submit">{activity ? 'Simpan perubahan' : 'Tambah kegiatan'}</Button></div>
    </form>
  );
}

export function ExtracurricularPage({ activities, setActivities }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [notice, setNotice] = useState('');
  const [archiveTarget, setArchiveTarget] = useState(null);

  const filteredActivities = useMemo(() => activities.filter((activity) => {
    const matchesQuery = `${activity.name} ${activity.advisor} ${activity.day} ${activity.location}`.toLocaleLowerCase('id').includes(query.trim().toLocaleLowerCase('id'));
    const matchesStatus = statusFilter === 'all'
      || (statusFilter === 'active' && activity.active && !activity.archived)
      || (statusFilter === 'inactive' && !activity.active && !activity.archived)
      || (statusFilter === 'archived' && activity.archived);
    return matchesQuery && matchesStatus;
  }), [activities, query, statusFilter]);

  function openAddDialog() { setEditingActivity(null); setDialogOpen(true); }
  function openEditDialog(activity) { setEditingActivity(activity); setDialogOpen(true); }

  function saveActivity(values) {
    if (editingActivity) {
      setActivities((current) => current.map((activity) => activity.id === editingActivity.id ? { ...activity, ...values } : activity));
      setNotice(`${values.name} berhasil diperbarui pada sesi demo ini.`);
    } else {
      const newActivity = { id: `demo-${Date.now()}`, archived: false, ...values };
      setActivities((current) => [newActivity, ...current]);
      setNotice(`${values.name} berhasil ditambahkan pada sesi demo ini.`);
    }
    setDialogOpen(false);
  }

  function archiveActivity() {
    if (!archiveTarget) return;
    setActivities((current) => current.map((activity) => activity.id === archiveTarget.id ? { ...activity, archived: true } : activity));
    setNotice(`${archiveTarget.name} diarsipkan. Data kegiatan tetap dipertahankan pada sesi demo ini.`);
    setArchiveTarget(null);
  }

  const columns = [
    { key: 'name', header: 'EKSTRAKURIKULER', render: (activity) => <span className="activity-name-cell"><strong>{activity.name}</strong><small>{activity.description}</small></span> },
    { key: 'advisor', header: 'PEMBINA' },
    { key: 'schedule', header: 'JADWAL', render: (activity) => <span className="activity-schedule-cell"><strong>{activity.day}</strong><small>{activity.time}</small></span> },
    { key: 'location', header: 'LOKASI' },
    { key: 'capacity', header: 'KAPASITAS', align: 'center', render: (activity) => activity.capacity ?? '—' },
    { key: 'active', header: 'STATUS', render: (activity) => <StatusBadge status={activity.archived ? 'Diarsipkan' : activity.active ? 'Aktif' : 'Nonaktif'} /> },
    { key: 'actions', header: 'AKSI', align: 'right', render: (activity) => activity.archived ? <span className="activity-archived-note">Tersimpan</span> : <div className="activity-actions"><Button variant="secondary" size="small" onClick={() => openEditDialog(activity)} aria-label={`Edit ${activity.name}`}>Edit</Button><Button variant="quiet" size="small" onClick={() => setArchiveTarget(activity)} aria-label={`Arsipkan ${activity.name}`}>Arsipkan</Button></div> },
  ];

  return (
    <div className="feature-page">
      <section className="feature-panel extracurricular-panel" aria-labelledby="extracurricular-list-title">
        <div className="feature-panel__heading extracurricular-heading"><div><h2 id="extracurricular-list-title">Daftar ekstrakurikuler</h2><p>Kelola informasi kegiatan dan statusnya.</p></div><Button onClick={openAddDialog}><span aria-hidden="true">＋</span> Tambah kegiatan</Button></div>
        <div className="activity-toolbar"><label className="activity-search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari kegiatan, pembina, atau lokasi" aria-label="Cari ekstrakurikuler" /></label><label className="activity-filter"><span className="sr-only">Filter status kegiatan</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">Semua status</option><option value="active">Aktif</option><option value="inactive">Nonaktif</option><option value="archived">Diarsipkan</option></select><span aria-hidden="true">⌄</span></label><span className="activity-result-count">{filteredActivities.length} dari {activities.length} kegiatan</span></div>
        {notice && <p className="activity-notice" role="status">{notice}<button type="button" aria-label="Tutup pesan" onClick={() => setNotice('')}>×</button></p>}
        {filteredActivities.length ? <DataTable columns={columns} rows={filteredActivities} caption="Daftar ekstrakurikuler demonstrasi" /> : <EmptyState title="Tidak ada kegiatan ditemukan" message={activities.length ? 'Coba ubah kata kunci atau filter status.' : 'Tambahkan kegiatan pertama untuk memulai daftar.'} action={!activities.length && <Button onClick={openAddDialog}>Tambah kegiatan</Button>} />}
        <p className="demo-note"><span aria-hidden="true">ⓘ</span> Data demonstrasi hanya disimpan selama halaman tetap terbuka dan akan kembali ke data awal saat dimuat ulang.</p>
      </section>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title={editingActivity ? 'Edit ekstrakurikuler' : 'Tambah ekstrakurikuler'} description="Informasi kegiatan pada prototipe demo ini tidak tersimpan ke server.">
        {dialogOpen && <ActivityForm key={editingActivity?.id ?? 'new'} activity={editingActivity} activities={activities} onSave={saveActivity} onCancel={() => setDialogOpen(false)} />}
      </Dialog>
      <Dialog open={Boolean(archiveTarget)} onClose={() => setArchiveTarget(null)} title="Arsipkan ekstrakurikuler?" description="Riwayat kegiatan tetap dipertahankan. Kegiatan yang diarsipkan tidak lagi dihitung sebagai kegiatan aktif.">
        {archiveTarget && <div className="archive-confirm"><p>Anda akan mengarsipkan <strong>{archiveTarget.name}</strong>.</p><div className="activity-form__actions"><Button variant="secondary" onClick={() => setArchiveTarget(null)}>Batal</Button><Button variant="primary" onClick={archiveActivity}>Arsipkan kegiatan</Button></div></div>}
      </Dialog>
    </div>
  );
}
