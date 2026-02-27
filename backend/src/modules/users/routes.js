import { Router } from 'express';
import { db } from '../../config/db.js';
import { requireRole, verifyToken } from '../../middleware/auth.js';

const router = Router();

router.get('/me', verifyToken, (req, res) => {
  const user = db.users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
  return res.json({ id: user.id, fullName: user.fullName, email: user.email, role: user.role });
});

router.get('/trainees', verifyToken, requireRole('teacher', 'admin'), (_req, res) => {
  const trainees = db.users
    .filter((u) => u.role === 'trainee')
    .map(({ passwordHash, ...rest }) => rest);
  return res.json(trainees);
});

export default router;
