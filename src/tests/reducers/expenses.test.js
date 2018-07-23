import expenseReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should set default state', () => {
  const result = expenseReducer(undefined, { type: '@@init' });
  expect(result).toEqual([]);
});

test('should remove expense by id', () => {
  const result = expenseReducer(expenses, {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  });
  expect(result).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense by wrong id', () => {
  const result = expenseReducer(expenses, {
    type: 'REMOVE_EXPENSE',
    id: 'wrong_id'
  });
  expect(result).toEqual(expenses);
});

test('should add a new expense', () => {
  const expense = {
    id: '123abc',
    description: 'Chess Board',
    note: '',
    amount: 200,
    createdAt: moment(0).add(6, 'days')
  };
  const result = expenseReducer(expenses, {
    type: 'ADD_EXPENSE',
    expense
  });

  expect(result).toEqual([...expenses, expense]);
});

test('should edit an expense, id provided', () => {
  const idToBeEdited = expenses[1].id;
  const noteToBeUpdated = 'this is updated note.';
  const result = expenseReducer(expenses, {
    type: 'EDIT_EXPENSE',
    id: idToBeEdited,
    updates: {
      note: noteToBeUpdated
    }
  });
  expect(result[1].note).toBe(noteToBeUpdated);
});

test('should not edit an expense, wrong id provided', () => {
  const idToBeEdited = 'wrong_id';
  const noteToBeUpdated = 'this is updated note.';
  const result = expenseReducer(expenses, {
    type: 'EDIT_EXPENSE',
    id: idToBeEdited,
    updates: {
      note: noteToBeUpdated
    }
  });
  expect(result).toEqual(expenses);
});
