import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let spyEditExpense;
let spyRemoveExpense;
let spyHistory;
let wrapper;

beforeEach(() => {
  spyEditExpense = jest.fn();
  spyRemoveExpense = jest.fn();
  spyHistory = { push: jest.fn() };

  wrapper = shallow(
    <EditExpensePage
      editExpense={spyEditExpense}
      removeExpense={spyRemoveExpense}
      history={spyHistory}
      expense={expenses[0]}
    />
  );
});

test('should render editExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
  expect(spyEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
  expect(spyHistory.push).toHaveBeenLastCalledWith('/');
});

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click');
  expect(spyRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[0].id });
  expect(spyHistory.push).toHaveBeenLastCalledWith('/');
});
