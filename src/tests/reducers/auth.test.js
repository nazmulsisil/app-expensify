import authReducer from '../../reducers/auth';

test('should return correct state against LOGIN action', () => {
  const action = {
    type: 'LOGIN',
    uid: 'abc123'
  };
  const state = authReducer(undefined, action);
  expect(state.uid).toBe(action.uid);
});

test('should return correct state against LOGOUT action', () => {
  const action = {
    type: 'LOGOUT'
  };
  const state = authReducer({ uid: 'anything' }, action);
  expect(state).toEqual({});
});
