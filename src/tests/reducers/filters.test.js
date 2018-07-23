import moment from 'moment';
import filterReducer from '../../reducers/filters';

test('should set up default filter values', () => {
  const state = filterReducer(undefined, { type: '@@init' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  });
});

test('should set sort by to amount', () => {
  const state = filterReducer(undefined, {
    type: 'SORT_BY_AMOUNT',
    sortBy: 'amount'
  });

  expect(state.sortBy).toBe('amount');
});

test('should set sort by to date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };
  const state = filterReducer(undefined, {
    type: 'SORT_BY_DATE',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  });
  expect(state.sortBy).toBe('date');
});

test('should set text_filter', () => {
  const state = filterReducer(undefined, {
    type: 'SET_TEXT_FILTER',
    text: 'coffee'
  });
  expect(state.text).toBe('coffee');
});

test('should set start_date', () => {
  const state = filterReducer(undefined, {
    type: 'SET_START_DATE',
    startDate: moment(0)
  });
  expect(state.startDate).toEqual(moment(0));
});

test('should set end_date', () => {
  const state = filterReducer(undefined, {
    type: 'SET_END_DATE',
    endDate: moment(0)
  });
  expect(state.endDate).toEqual(moment(0));
});
