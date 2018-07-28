import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';

export const AddExpensePage = props => {
  return (
    <div>
      <h2>Add Expense</h2>
      <ExpenseForm
        onSubmit={submittedState => {
          // props.dispatch(startAddExpense(submittedState));
          props.startAddExpense(submittedState);
          props.history.push('./');
        }}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return { startAddExpense: expense => dispatch(startAddExpense(expense)) };
};

export default connect(
  undefined,
  mapDispatchToProps
)(AddExpensePage);
