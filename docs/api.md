# API Student Management

## Auth
- `POST /api/auth/register` inscription stagiaire.
- `POST /api/auth/login` connexion.
- `POST /api/auth/teachers` création professeur (admin).

## Users
- `GET /api/users/me` profil courant.
- `GET /api/users/trainees` liste stagiaires (teacher/admin).

## Absences
- `POST /api/absences` créer absence (teacher/admin).
- `GET /api/absences` lire absences (filtrée pour stagiaire).

## Content (examens/exercices/emplois du temps)
- `POST /api/content` publier contenu (teacher/admin).
- `GET /api/content` consulter contenus (all auth users).
