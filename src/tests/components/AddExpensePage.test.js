import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';
import ExpenseForm from '../../components/ExpenseForm';

let spyAddExpense;
let spyHistoryPush;
let wrapper;

beforeEach(() => {
  spyAddExpense = jest.fn();
  spyHistoryPush = { push: jest.fn() };
  wrapper = shallow(
    <AddExpensePage addExpense={spyAddExpense} history={spyHistoryPush} />
  );
});

test('should render Add Expense Page correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(spyAddExpense).toHaveBeenLastCalledWith(expenses[1]);
  expect(spyHistoryPush.push).toHaveBeenLastCalledWith('./');
});
