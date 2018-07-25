import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

const ExpenseDashboardPage = () => {
  return (
    <div>
      <h3>ExpenseDashboardPage</h3>
      <ExpenseListFilters />
      <ExpensesSummary />
      <ExpenseList />
    </div>
  );
};
export default ExpenseDashboardPage;
