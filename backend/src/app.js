import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './modules/auth/routes.js';
import usersRoutes from './modules/users/routes.js';
import absencesRoutes from './modules/absences/routes.js';
import contentRoutes from './modules/content/routes.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/absences', absencesRoutes);
app.use('/api/content', contentRoutes);

export default app;
