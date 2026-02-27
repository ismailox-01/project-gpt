import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import StudentPage from './pages/StudentPage';
import TeacherPage from './pages/TeacherPage';
import AdminPage from './pages/AdminPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import RoleRoute from './routes/RoleRoute';

export default function App() {
  return (
    <>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/student">Stagiaire</Link> |{' '}
        <Link to="/teacher">Prof</Link> | <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/student"
          element={
            <RoleRoute roles={['trainee']}>
              <StudentPage />
            </RoleRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <RoleRoute roles={['teacher']}>
              <TeacherPage />
            </RoleRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <RoleRoute roles={['admin']}>
              <AdminPage />
            </RoleRoute>
          }
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </>
  );
}
