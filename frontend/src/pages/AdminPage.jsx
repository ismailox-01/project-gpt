import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../services/api';

export default function AdminPage() {
  const user = useSelector((s) => s.auth.user);
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const submit = (e) => {
    e.preventDefault();
    try {
      api.createTeacher(user, form);
      setMessage('✅ Professeur créé avec succès');
      setForm({ fullName: '', email: '', password: '' });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="panel">
      <h2>Espace Admin</h2>
      <p className="muted">Seul l'admin peut créer un professeur.</p>
      <form className="form-grid" onSubmit={submit}>
        <input placeholder="Nom complet" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Mot de passe" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Créer Professeur</button>
      </form>
      <p>{message}</p>
    </section>
  );
}
