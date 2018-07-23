import { createStore } from 'redux';

const store = createStore((defaultState = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: defaultState.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: defaultState.count - action.decrementBy
      };
    case 'SET':
      return {
        count: action.set
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return defaultState;
  }
});

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

const incrementCount = ({ incrementBy = 1 } = {}) => {
  return {
    type: 'INCREMENT',
    incrementBy
  };
};

const decrementCount = ({ decrementBy = 1 } = {}) => {
  return {
    type: 'DECREMENT',
    decrementBy
  };
};

const setCount = ({ set = 101 } = {}) => {
  return {
    type: 'SET',
    set
  };
};

const resetCount = () => {
  return {
    type: 'RESET'
  };
};

store.dispatch(incrementCount());
store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(setCount());
store.dispatch(setCount({ set: 202 }));
store.dispatch(resetCount());
store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 10 }));
