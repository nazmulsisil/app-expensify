import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
} = {}) => {
  return {
    type: 'ADD_EXPENSE',
    expense: {
      id: uuid(),
      description,
      note,
      amount,
      createdAt
    }
  };
};

const editExpense = (id, updates = {}) => {
  return {
    type: 'EDIT_EXPENSE',
    id,
    updates
  };
};

const removeExpense = ({ id } = {}) => {
  return {
    type: 'REMOVE_EXPENSE',
    id
  };
};

const expenseReducerDefaultState = [];

const expenseReducer = (state = expenseReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(expense => expense.id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

const setTextFilter = (text = '') => {
  return {
    type: 'SET_TEXT_FILTER',
    text
  };
};

const sortByAmount = () => {
  return {
    type: 'SORT_BY_AMOUNT'
  };
};

const sortByDate = () => {
  return {
    type: 'SORT_BY_DATE'
  };
};

const setStartDate = startDate => {
  return {
    type: 'SET_START_DATE',
    startDate
  };
};

const setEndDate = endDate => {
  return {
    type: 'SET_END_DATE',
    endDate
  };
};

const filterReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SET_START_DATE': {
      return {
        ...state,
        startDate: action.startDate
      };
    }
    case 'SET_END_DATE': {
      return { ...state, endDate: action.endDate };
    }
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    filters: filterReducer
  })
);

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== 'number' || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'amount') {
        return a.amount > b.amount ? -1 : 1;
      }
      return a.createdAt > b.createdAt ? -1 : 1;
    });
};

const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const finalDemoState = {
  expenses: [
    {
      id: '23g3lkh32',
      description: 'Home Rent',
      note: 'Home rent was paid successfully',
      amount: 300,
      createdAt: 0
    }
  ],
  filters: {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
};

const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 100, createdAt: 11100 })
);

const expenseTwo = store.dispatch(
  addExpense({ description: 'Coffee', amount: 300, createdAt: 1500 })
);

// const removeOne = store.dispatch(
//   removeExpense({
//     id: expenseOne.expense.id
//   })
// );

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
store.dispatch(sortByDate());

// store.dispatch(setStartDate(11215));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(12050));
