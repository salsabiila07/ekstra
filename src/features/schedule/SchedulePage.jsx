const weekdays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const demoScheduleUpdates = {
  'ekskul-01': { location: 'Aula sekolah', note: 'Lokasi latihan minggu ini berpindah dari lapangan ke aula sekolah.' },
};

export function SchedulePage({ activities, role }) {
  const scheduledActivities = activities
    .filter((activity) => activity.active && !activity.archived)
    .slice()
    .sort((first, second) => weekdays.indexOf(first.day) - weekdays.indexOf(second.day) || first.time.localeCompare(second.time));

  const roleDescriptions = {
    admin: 'Jadwal kegiatan ekstrakurikuler yang terdaftar di sekolah.',
    siswa: 'Jadwal kegiatan ekstrakurikuler yang tersedia untuk siswa.',
    pembina: 'Jadwal kegiatan ekstrakurikuler dalam data demonstrasi.',
  };

  return (
    <div className="feature-page schedule-page">
      <section className="feature-panel" aria-labelledby="schedule-list-title">
        <div className="feature-panel__heading schedule-heading"><div><h2 id="schedule-list-title">Jadwal kegiatan</h2><p>{roleDescriptions[role] ?? roleDescriptions.admin}</p></div><span className="feature-panel__count">{scheduledActivities.length} jadwal</span></div>
        <div className="schedule-list">
          {scheduledActivities.length ? scheduledActivities.map((activity) => (
            (() => {
              const update = demoScheduleUpdates[activity.id];
              const location = update?.location ?? activity.location;
              return (
            <article className="schedule-item" key={activity.id}>
              <div className="schedule-day"><strong>{activity.day.slice(0, 3)}</strong><span>{activity.day}</span></div>
              <div className="schedule-main"><div className="schedule-title-row"><h3>{activity.name}</h3><span className="schedule-time">◷ {activity.time}</span></div><div className="schedule-meta"><span><span aria-hidden="true">⌖</span> {location}</span><span><span aria-hidden="true">♙</span> {activity.advisor}</span></div>
                {update && <p className="schedule-change"><span aria-hidden="true">!</span><span><strong>Informasi perubahan</strong>{update.note}</span></p>}
              </div>
            </article>
              );
            })()
          )) : <div className="schedule-empty"><span aria-hidden="true">▦</span><strong>Belum ada jadwal aktif</strong><p>Jadwal kegiatan aktif akan tampil di sini.</p></div>}
        </div>
        <p className="demo-note"><span aria-hidden="true">ⓘ</span> Jadwal dan informasi perubahan pada halaman ini merupakan data demonstrasi.</p>
      </section>
    </div>
  );
}
