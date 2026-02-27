const reducer = require('../features/auth/authSlice').default;
const { logout } = require('../features/auth/authSlice');

describe('auth reducer', () => {
  it('logout reset user and token', () => {
    const initial = { token: 'x', user: { id: 1 }, status: 'idle', error: '' };
    const next = reducer(initial, logout());
    expect(next.token).toBe('');
    expect(next.user).toBe(null);
  });
});
