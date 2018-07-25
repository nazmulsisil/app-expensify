import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';
import { filtersAlternative } from '../fixtures/filters';

test('should render ExpensesSummary for 1 expense', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={1} expensesTotal={235} />
  );

  expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary for 3 expenses', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={23} expensesTotal={2355421254} />
  );

  expect(wrapper).toMatchSnapshot();
});
