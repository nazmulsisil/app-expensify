import React from 'react';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/initialize';

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false
    };
  }
  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => {
      return { description };
    });
  };
  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => {
      return { note };
    });
  };
  onAmountChange = e => {
    const amount = e.target.value;

    if (amount.match(/^\d*?(.\d{0,2})$/) || amount === '') {
      this.setState(() => {
        return { amount };
      });
    }
  };
  onDateChange = createdAt => {
    this.setState(() => {
      return {
        createdAt
      };
    });
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => {
      return {
        calendarFocused: focused
      };
    });
  };
  onSubmit = e => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => {
        return {
          error: 'Please provide description and amount.'
        };
      });
    } else {
      this.setState(() => {
        return {
          error: ''
        };
      });
      this.props.onSubmit({
        description: this.state.description,
        note: this.state.note,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf()
      });
    }
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.state.error && <p>{this.state.error}</p>}
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="number"
          placeholder="Amount"
          name="amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <textarea
          name="note"
          id="note"
          placeholder="Add note for your expense"
          value={this.state.note}
          onChange={this.onNoteChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />

        <button>Add Expense</button>
      </form>
    );
  }
}
