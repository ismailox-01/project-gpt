import React from 'react';

export default function UnauthorizedPage() {
  return (
    <section className="panel">
      <h2>⛔ Accès non autorisé</h2>
      <p className="muted">Ton rôle actuel ne permet pas d'accéder à cette page.</p>
    </section>
  );
}
