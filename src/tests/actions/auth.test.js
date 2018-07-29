import { login, logout } from '../../actions/auth';

test('should generate login action object', () => {
  const uid = 'abc123';
  const action = {
    type: 'LOGIN',
    uid
  };
  const result = login(uid);
  expect(result).toEqual(action);
});

test('should generate logout action object', () => {
  const result = logout();
  expect(result).toEqual({
    type: 'LOGOUT'
  });
});
