import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

import {
  addExpense,
  editExpense,
  removeExpense,
  startAddExpense
} from '../../actions/expenses';

const middleware = [thunk];
const createMockStore = configureStore(middleware);

test('should set up remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should created action object for edit expense', () => {
  const action = editExpense('abc123', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'abc123',
    updates: {
      note: 'New note value'
    }
  });
});

test('should return action object for add expense argument provided', () => {
  const expense = {
    id: '123abc',
    description: 'coffee',
    note: 'month of july',
    amount: 475,
    createdAt: 10000
  };
  const action = addExpense(expense);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expense,
      id: expect.any(String)
    }
  });
});

test('should add expense to database and store', done => {
  const store = createMockStore({});
  const expenseData = {
    description: 'coffee',
    note: 'month of july',
    amount: 475,
    createdAt: 10000
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const action = store.getActions()[0];
      expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
      const dbRef = database.ref(`expenses/${action.expense.id}`).once('value');
      return dbRef;
    })
    .then(snapShot => {
      const dbFetchedData = snapShot.val();
      expect(dbFetchedData).toEqual(expenseData);
      done();
    });
});

test('should add expense with defaults to database and store', done => {
  const store = createMockStore({});
  const defaultExpenseData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };

  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const action = store.getActions()[0];
      expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...defaultExpenseData
        }
      });
      const dbRef = database.ref(`expenses/${action.expense.id}`).once('value');
      return dbRef;
    })
    .then(snapShot => {
      const dbFetchedData = snapShot.val();
      expect(dbFetchedData).toEqual(defaultExpenseData);
      done();
    });
});

// test('should return action object without arg invoke', () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: expect.any(String),
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0
//     }
//   });
// });
