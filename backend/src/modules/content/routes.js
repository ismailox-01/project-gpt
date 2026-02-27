import { Router } from 'express';
import { db, idGenerator } from '../../config/db.js';
import { requireRole, verifyToken } from '../../middleware/auth.js';

const router = Router();

router.post('/', verifyToken, requireRole('teacher', 'admin'), (req, res) => {
  const { type, title, fileUrl } = req.body;
  if (!type || !title || !fileUrl) {
    return res.status(400).json({ message: 'type, title, fileUrl requis' });
  }

  const content = {
    id: idGenerator.next('content'),
    type,
    title,
    fileUrl,
    createdBy: req.user.id
  };
  db.contents.push(content);
  return res.status(201).json(content);
});

router.get('/', verifyToken, (_req, res) => {
  return res.json(db.contents);
});

export default router;
