import test from 'node:test';
import assert from 'node:assert/strict';
import { signToken } from '../../middleware/auth.js';

test('signToken retourne un JWT string', () => {
  const token = signToken({ id: 1, role: 'admin' });
  assert.equal(typeof token, 'string');
  assert.equal(token.split('.').length, 3);
});
