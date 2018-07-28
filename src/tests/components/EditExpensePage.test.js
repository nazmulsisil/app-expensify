import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let spyStartEditExpense;
let spyStartRemoveExpense;
let spyHistory;
let wrapper;

beforeEach(() => {
  spyStartEditExpense = jest.fn();
  spyStartRemoveExpense = jest.fn();
  spyHistory = { push: jest.fn() };

  wrapper = shallow(
    <EditExpensePage
      startEditExpense={spyStartEditExpense}
      startRemoveExpense={spyStartRemoveExpense}
      history={spyHistory}
      expense={expenses[0]}
    />
  );
});

test('should render editExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle startEditExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
  expect(spyStartEditExpense).toHaveBeenLastCalledWith(
    expenses[0].id,
    expenses[0]
  );
  expect(spyHistory.push).toHaveBeenLastCalledWith('/');
});

test('should handle startRemoveExpense', () => {
  wrapper.find('button').simulate('click');
  expect(spyStartRemoveExpense).toHaveBeenLastCalledWith({
    id: expenses[0].id
  });
  expect(spyHistory.push).toHaveBeenLastCalledWith('/');
});
