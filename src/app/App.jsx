import { useEffect, useState } from 'react';
import { AppShell } from '../components/layout/AppShell.jsx';
import { resolveRoute } from './routes.jsx';
import { initialExtracurriculars, initialRegistrations } from '../data/mock/extracurriculars.js';
import { initialAttendanceRecords } from '../data/mock/attendance.js';
import { initialAssessments } from '../data/mock/assessments.js';

export default function App() {
  const [route, setRoute] = useState(() => resolveRoute());
  const [activities, setActivities] = useState(initialExtracurriculars);
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [attendanceRecords, setAttendanceRecords] = useState(initialAttendanceRecords);
  const [assessmentRecords, setAssessmentRecords] = useState(initialAssessments);

  function registerStudent(activity) {
    setRegistrations((current) => [
      ...current,
      {
        id: `demo-reg-${Date.now()}`,
        student: 'Siswa Demo 01',
        activityId: activity.id,
        activityName: activity.name,
        submittedAt: new Date().toISOString().slice(0, 10),
        status: 'Diterima',
      },
    ]);
  }

  function saveAttendance({ activityId, activityName, date, statuses }) {
    setAttendanceRecords((current) => {
      const otherSessions = current.filter((record) => record.activityId !== activityId || record.date !== date);
      const sessionRecords = Object.entries(statuses).map(([studentId, status]) => ({
        id: `${activityId}-${studentId}-${date}`,
        studentId,
        studentName: `Siswa Demo ${studentId.slice(-2)}`,
        activityId,
        activityName,
        date,
        status,
      }));
      return [...otherSessions, ...sessionRecords];
    });
  }

  function saveAssessment({ activityId, activityName, studentId, studentName, period, skills, discipline, participation, note }) {
    setAssessmentRecords((current) => {
      const otherAssessments = current.filter((record) => record.activityId !== activityId || record.studentId !== studentId || record.period !== period);
      return [...otherAssessments, {
        id: `${activityId}-${studentId}-${period}`,
        activityId,
        activityName,
        studentId,
        studentName,
        period,
        skills,
        discipline,
        participation,
        note,
      }];
    });
  }

  useEffect(() => {
    if (!window.location.hash) window.location.hash = '#/admin/dashboard';
    const updateRoute = () => setRoute(resolveRoute());
    window.addEventListener('hashchange', updateRoute);
    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);

  return <AppShell route={route} activities={activities} setActivities={setActivities} registrations={registrations} onRegister={registerStudent} attendanceRecords={attendanceRecords} onSaveAttendance={saveAttendance} assessmentRecords={assessmentRecords} onSaveAssessment={saveAssessment} />;
}
