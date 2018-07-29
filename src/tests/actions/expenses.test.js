import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

import {
  addExpense,
  editExpense,
  removeExpense,
  startAddExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';

const middleware = [thunk];
const uid = 'abc123';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureStore(middleware);

beforeEach(done => {
  const expenseData = {};
  expenses.forEach(({ id, description, amount, note, createdAt }) => {
    expenseData[id] = { description, amount, note, createdAt };
  });

  database
    .ref(`users/${uid}/expenses`)
    .set(expenseData)
    .then(() => {
      done();
    });
});

test('should set up remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should remove expenses from firebase', done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;

  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const action = store.getActions()[0];
      expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id
      });
      const dbRef = database
        .ref(`users/${uid}/expenses/${action.id}`)
        .once('value');
      return dbRef;
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
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

test('should edit expenses from firebase', done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[1].id;
  const updates = {
    description: 'this was from edit firebase test desc',
    note: 'firebase edit test note',
    amount: 999,
    createdAt: 0
  };

  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const action = store.getActions()[0];
      expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
      });
      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(updates);
      done();
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
  const store = createMockStore(defaultAuthState);
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
      const dbRef = database
        .ref(`users/${uid}/expenses/${action.expense.id}`)
        .once('value');
      return dbRef;
    })
    .then(snapShot => {
      const dbFetchedData = snapShot.val();
      expect(dbFetchedData).toEqual(expenseData);
      done();
    });
});

test('should add expense with defaults to database and store', done => {
  const store = createMockStore(defaultAuthState);
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
      const dbRef = database
        .ref(`users/${uid}/expenses/${action.expense.id}`)
        .once('value');
      return dbRef;
    })
    .then(snapShot => {
      const dbFetchedData = snapShot.val();
      expect(dbFetchedData).toEqual(defaultExpenseData);
      done();
    });
});

test('should setup set expense action object with data', () => {
  const result = setExpenses(expenses);
  expect(result).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', done => {
  const store = createMockStore(defaultAuthState);

  store.dispatch(startSetExpenses()).then(() => {
    const action = store.getActions()[0];
    expect(action).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});
