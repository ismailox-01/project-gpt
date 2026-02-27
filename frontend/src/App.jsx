import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentPage from './pages/StudentPage';
import TeacherPage from './pages/TeacherPage';
import AdminPage from './pages/AdminPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import RoleRoute from './routes/RoleRoute';
import campusImg from './assets/campus.svg';

export default function App() {
  return (
    <div className="app-shell">
      <section className="hero">
        <div>
          <span className="badge">OFPPT Student Management</span>
          <h1>Plateforme moderne pour gérer stagiaires, absences et ressources</h1>
          <p className="muted">Design propre, rôles sécurisés et expérience fluide pour Admin, Professeurs et Stagiaires.</p>
        </div>
        <img src={campusImg} alt="Campus OFPPT" />
      </section>

      <nav className="nav">
        <Link to="/login">Login</Link>
        <Link to="/register">Inscription</Link>
        <Link to="/student">Espace Stagiaire</Link>
        <Link to="/teacher">Espace Prof</Link>
        <Link to="/admin">Espace Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/student" element={<RoleRoute roles={['trainee']}><StudentPage /></RoleRoute>} />
        <Route path="/teacher" element={<RoleRoute roles={['teacher']}><TeacherPage /></RoleRoute>} />
        <Route path="/admin" element={<RoleRoute roles={['admin']}><AdminPage /></RoleRoute>} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </div>
  );
}
