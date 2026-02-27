const STORAGE_KEY = 'ofppt-sm-data';

const defaultData = {
  users: [
    { id: 1, fullName: 'Admin OFPPT', email: 'admin@ofppt.ma', password: 'admin123', role: 'admin' }
  ],
  absences: [],
  contents: []
};

function readDb() {
  const value = localStorage.getItem(STORAGE_KEY);
  if (!value) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return { ...defaultData };
  }
  return JSON.parse(value);
}

function writeDb(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

export const api = {
  registerTrainee({ fullName, email, password }) {
    const db = readDb();
    if (db.users.some((u) => u.email === email)) throw new Error('Email déjà utilisé');
    const user = { id: Date.now(), fullName, email, password, role: 'trainee' };
    db.users.push(user);
    writeDb(db);
    return { id: user.id, fullName: user.fullName, role: user.role, email: user.email };
  },

  login({ email, password }) {
    const db = readDb();
    const user = db.users.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error('Identifiants invalides');
    return { token: `local-token-${user.id}`, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role } };
  },

  createTeacher(currentUser, payload) {
    if (currentUser?.role !== 'admin') throw new Error('Accès refusé');
    const db = readDb();
    if (db.users.some((u) => u.email === payload.email)) throw new Error('Email déjà utilisé');
    const teacher = { id: Date.now(), role: 'teacher', ...payload };
    db.users.push(teacher);
    writeDb(db);
    return teacher;
  },

  listTrainees() {
    return readDb().users.filter((u) => u.role === 'trainee');
  },

  createAbsence(currentUser, payload) {
    if (!['teacher', 'admin'].includes(currentUser?.role)) throw new Error('Accès refusé');
    const db = readDb();
    const absence = { id: Date.now(), teacherId: currentUser.id, ...payload };
    db.absences.push(absence);
    writeDb(db);
    return absence;
  },

  listAbsences(currentUser) {
    const db = readDb();
    if (currentUser?.role === 'trainee') return db.absences.filter((a) => a.studentId === currentUser.id);
    return db.absences;
  },

  createContent(currentUser, payload) {
    if (!['teacher', 'admin'].includes(currentUser?.role)) throw new Error('Accès refusé');
    const db = readDb();
    const content = { id: Date.now(), createdBy: currentUser.id, ...payload };
    db.contents.push(content);
    writeDb(db);
    return content;
  },

  listContent() {
    return readDb().contents;
  }
};
