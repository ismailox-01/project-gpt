import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db, idGenerator } from '../../config/db.js';
import { signToken, verifyToken, requireRole } from '../../middleware/auth.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Champs requis manquants' });
  }

  if (db.users.some((u) => u.email === email)) {
    return res.status(409).json({ message: 'Email déjà utilisé' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: idGenerator.next('user'),
    fullName,
    email,
    passwordHash,
    role: 'trainee'
  };

  db.users.push(user);
  return res.status(201).json({ id: user.id, role: user.role, email: user.email });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }

  const token = signToken({ id: user.id, role: user.role, email: user.email });
  return res.json({
    token,
    user: { id: user.id, fullName: user.fullName, role: user.role, email: user.email }
  });
});

router.post('/teachers', verifyToken, requireRole('admin'), async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Champs requis manquants' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const teacher = {
    id: idGenerator.next('user'),
    fullName,
    email,
    passwordHash,
    role: 'teacher'
  };
  db.users.push(teacher);
  return res.status(201).json({ id: teacher.id, role: teacher.role, email: teacher.email });
});

export default router;
