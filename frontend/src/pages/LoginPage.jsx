import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../features/auth/authSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const { status, error, user } = useSelector((s) => s.auth);
  const [email, setEmail] = useState('admin@ofppt.ma');
  const [password, setPassword] = useState('admin123');

  return (
    <section className="panel">
      <h2>Connexion</h2>
      <p className="muted">Compte admin demo: admin@ofppt.ma / admin123</p>
      <form className="form-grid" onSubmit={(e) => { e.preventDefault(); dispatch(login({ email, password })); }}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Mot de passe" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Se connecter</button>
      </form>
      <p className="muted">Statut: {status}</p>
      <p>{error}</p>
      {user && <button onClick={() => dispatch(logout())}>Logout ({user.fullName})</button>}
    </section>
  );
}
