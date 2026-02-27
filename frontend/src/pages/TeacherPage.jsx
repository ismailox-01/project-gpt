import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAbsence, fetchAbsences } from '../features/absences/absencesSlice';
import { addContent, fetchContent } from '../features/content/contentSlice';
import { api } from '../services/api';
import attendanceImg from '../assets/attendance.svg';

export default function TeacherPage() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const absences = useSelector((s) => s.absences.items);
  const content = useSelector((s) => s.content.items);
  const [students, setStudents] = useState([]);
  const [absence, setAbsence] = useState({ studentId: '', date: '', reason: '' });
  const [doc, setDoc] = useState({ type: 'exam', title: '', fileUrl: '' });

  useEffect(() => {
    setStudents(api.listTrainees());
    if (user) {
      dispatch(fetchAbsences(user));
      dispatch(fetchContent());
    }
  }, [dispatch, user]);

  return (
    <section className="panel">
      <h2>Espace Professeur</h2>
      <img className="card-img" src={attendanceImg} alt="Gestion d'absences" />
      <div className="columns">
        <div>
          <h3>Ajouter une absence</h3>
          <form className="form-grid" onSubmit={(e) => {
            e.preventDefault();
            dispatch(addAbsence({ user, payload: { ...absence, studentId: Number(absence.studentId) } }));
          }}>
            <select value={absence.studentId} onChange={(e) => setAbsence({ ...absence, studentId: e.target.value })}>
              <option value="">Choisir stagiaire</option>
              {students.map((s) => <option key={s.id} value={s.id}>{s.fullName}</option>)}
            </select>
            <input type="date" value={absence.date} onChange={(e) => setAbsence({ ...absence, date: e.target.value })} />
            <input placeholder="Motif" value={absence.reason} onChange={(e) => setAbsence({ ...absence, reason: e.target.value })} />
            <button type="submit">Enregistrer</button>
          </form>
          <ul className="list">{absences.map((a) => <li key={a.id}>{a.studentId} - {a.date} - {a.reason}</li>)}</ul>
        </div>

        <div>
          <h3>Publier contenu</h3>
          <form className="form-grid" onSubmit={(e) => { e.preventDefault(); dispatch(addContent({ user, payload: doc })); }}>
            <select value={doc.type} onChange={(e) => setDoc({ ...doc, type: e.target.value })}>
              <option value="exam">Exam</option>
              <option value="exercise">Exercise</option>
              <option value="schedule">Schedule</option>
            </select>
            <input placeholder="Titre" value={doc.title} onChange={(e) => setDoc({ ...doc, title: e.target.value })} />
            <input placeholder="Lien fichier" value={doc.fileUrl} onChange={(e) => setDoc({ ...doc, fileUrl: e.target.value })} />
            <button type="submit">Publier</button>
          </form>
          <ul className="list">{content.map((c) => <li key={c.id}>{c.type} - {c.title}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
