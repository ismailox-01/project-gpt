export const db = {
  users: [
    {
      id: 1,
      fullName: 'Admin OFPPT',
      email: 'admin@ofppt.ma',
      passwordHash: '$2a$10$x4gOW6tKqjfCg2YkdEYYDuM6g7M40ej9rLDAESfRfx2dgJWAifM9C',
      role: 'admin'
    }
  ],
  absences: [],
  contents: []
};

export const idGenerator = (() => {
  const counters = { user: 2, absence: 1, content: 1 };
  return {
    next: (type) => counters[type]++
  };
})();
