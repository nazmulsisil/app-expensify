import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
} from '../../actions/filters';
import moment from 'moment';

test('should return action object for setTextFilter', () => {
  const action = setTextFilter('coffee');

  expect(action).toEqual({ type: 'SET_TEXT_FILTER', text: 'coffee' });
});
test('should return action object for setTextFilter with default', () => {
  const action = setTextFilter();

  expect(action).toEqual({ type: 'SET_TEXT_FILTER', text: '' });
});

test('should return action object for sortByAmount', () => {
  const action = sortByAmount();

  expect(action).toEqual({ type: 'SORT_BY_AMOUNT' });
});

test('should return action object for sortByDate', () => {
  const action = sortByDate();

  expect(action).toEqual({ type: 'SORT_BY_DATE' });
});

test('should return action object for setStartDate', () => {
  const action = setStartDate(moment(0));

  expect(action).toEqual({ type: 'SET_START_DATE', startDate: moment(0) });
});

test('should return action object for setEndDate', () => {
  const action = setEndDate(moment(0));

  expect(action).toEqual({ type: 'SET_END_DATE', endDate: moment(0) });
});
