# Student Management OFPPT

Monorepo contenant une application de gestion des stagiaires OFPPT:
- Frontend React + Redux Toolkit + Router.
- Backend Express + JWT + RBAC.
- Déploiement frontend statique via Nginx.
- Qualité de code via SonarQube + CI GitLab.

## Démarrage rapide

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
```

## Comptes et rôles
- Inscription publique: `trainee` uniquement.
- Création `teacher`: réservée à l'`admin`.
- Les routes sont protégées par token JWT et rôle.
