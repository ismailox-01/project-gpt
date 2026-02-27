import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAbsences } from '../features/absences/absencesSlice';
import { fetchContent } from '../features/content/contentSlice';
import libraryImg from '../assets/library.svg';

export default function StudentPage() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const absences = useSelector((s) => s.absences.items);
  const content = useSelector((s) => s.content.items);

  useEffect(() => {
    if (user) {
      dispatch(fetchAbsences(user));
      dispatch(fetchContent());
    }
  }, [dispatch, user]);

  return (
    <section className="panel">
      <h2>Espace Stagiaire</h2>
      <div className="columns">
        <div>
          <h3>Mes absences</h3>
          <ul className="list">{absences.map((a) => <li key={a.id}>{a.date} — {a.reason}</li>)}</ul>
        </div>
        <div>
          <img className="card-img" src={libraryImg} alt="Ressources pédagogiques" />
          <h3>Examens / Exercices / Emploi du temps</h3>
          <ul className="list">{content.map((c) => <li key={c.id}>{c.type} — {c.title} ({c.fileUrl})</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
