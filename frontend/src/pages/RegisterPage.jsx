import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerTrainee } from '../features/auth/authSlice';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });

  return (
    <section className="panel">
      <h2>Inscription Stagiaire</h2>
      <form className="form-grid" onSubmit={(e) => { e.preventDefault(); dispatch(registerTrainee(form)); }}>
        <input placeholder="Nom complet" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Mot de passe" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Créer mon compte</button>
      </form>
      {status === 'succeeded' && <p>✅ Inscription réussie. Passe à Login.</p>}
      {!!error && <p>{error}</p>}
    </section>
  );
}
