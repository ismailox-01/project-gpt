# Student Management OFPPT (GitHub Pages Ready)

Application React + Redux pour la gestion des stagiaires OFPPT avec 2 rôles principaux:
- **Stagiaire**: inscription, consultation absences personnelles, examens, exercices, emploi du temps.
- **Professeur**: gestion absences, publication contenus (examens/exercices/emploi du temps).
- **Admin** (technique): création des comptes professeur.

> Cette version est **100% statique** pour fonctionner directement sur **GitHub Pages** sans serveur backend.
> Les données sont stockées dans `localStorage`.

## Fonctionnalités
- Authentification locale (session conservée en localStorage).
- RBAC (routes protégées par rôle).
- Inscription publique: stagiaire uniquement.
- Création des professeurs: admin uniquement.
- Gestion absences + contenus pédagogiques.
- Redux Toolkit pour l'état global.
- Routing avec React Router.
- Tests de base (Jest + Enzyme).
- Design moderne responsive + illustrations SVG liées à la gestion scolaire.

## Lancer en local
```bash
cd frontend
npm install
npm run dev
```

Compte admin par défaut:
- Email: `admin@ofppt.ma`
- Mot de passe: `admin123`

## Déploiement GitHub Pages
1. Ouvre `frontend/package.json` et remplace:
   - `homepage`: `https://YOUR_GITHUB_USERNAME.github.io/project-gpt`
   par ton vrai username/repo.
2. Vérifie `base` dans `frontend/vite.config.js` (doit matcher le nom du repo).
3. Lance:
```bash
cd frontend
npm install
npm run deploy
```
4. Dans GitHub: `Settings > Pages`, source sur la branche `gh-pages` si nécessaire.

## Stack
- React 17
- Redux Toolkit
- React Router v6
- Vite
