import { Router } from 'express';
import { db, idGenerator } from '../../config/db.js';
import { requireRole, verifyToken } from '../../middleware/auth.js';

const router = Router();

router.post('/', verifyToken, requireRole('teacher', 'admin'), (req, res) => {
  const { studentId, date, reason = '' } = req.body;
  if (!studentId || !date) return res.status(400).json({ message: 'studentId et date requis' });

  const absence = {
    id: idGenerator.next('absence'),
    studentId,
    date,
    reason,
    teacherId: req.user.id
  };
  db.absences.push(absence);
  return res.status(201).json(absence);
});

router.get('/', verifyToken, (req, res) => {
  if (req.user.role === 'trainee') {
    return res.json(db.absences.filter((a) => a.studentId === req.user.id));
  }
  return res.json(db.absences);
});

export default router;
