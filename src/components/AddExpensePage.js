import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses';

export const AddExpensePage = props => {
  return (
    <div>
      <h2>Add Expense</h2>
      <ExpenseForm
        onSubmit={submittedState => {
          // props.dispatch(addExpense(submittedState));
          props.addExpense(submittedState);
          props.history.push('./');
        }}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return { addExpense: expense => dispatch(addExpense(expense)) };
};

export default connect(
  undefined,
  mapDispatchToProps
)(AddExpensePage);
