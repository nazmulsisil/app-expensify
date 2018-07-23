import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const ExpenseDashboardPage = () => {
  return (
    <div>
      <h3>ExpenseDashboardPage</h3>
      <ExpenseListFilters />
      <ExpenseList />
    </div>
  );
};
export default ExpenseDashboardPage;
