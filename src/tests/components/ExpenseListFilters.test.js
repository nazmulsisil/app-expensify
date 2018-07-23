import React from 'react';
import { DateRangePicker } from 'react-dates';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filtersDefault, filtersAlternative } from '../fixtures/filters';
import moment from 'moment';

let wrapper;
let spySetStartDate;
let spySetEndDate;
let spySetTextFilter;
let spySortByAmount;
let spySortByDate;

beforeEach(() => {
  spySetStartDate = jest.fn();
  spySetEndDate = jest.fn();
  spySetTextFilter = jest.fn();
  spySortByAmount = jest.fn();
  spySortByDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filtersDefault}
      setStartDate={spySetStartDate}
      setEndDate={spySetEndDate}
      setTextFilter={spySetTextFilter}
      sortByAmount={spySortByAmount}
      sortByDate={spySortByDate}
    />
  );
});

test('should render ExpenseListFilter correctly', () => {
  expect(wrapper).toMatchSnapshot();
});
test('should render alternative filters in ExpenseListFilter correctly', () => {
  wrapper.setProps({
    filters: filtersAlternative
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const value = 'rent';
  wrapper.find('input').simulate('change', {
    target: { value }
  });
  expect(spySetTextFilter).toHaveBeenLastCalledWith(value);
});

test('should handle sort by date', () => {
  const value = 'date';
  wrapper.setProps({
    filters: filtersAlternative
  });
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(spySortByDate).toHaveBeenLastCalledWith(value);
});

test('should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(spySortByAmount).toHaveBeenLastCalledWith(value);
});

test('should handle date changes', () => {
  const startDate = moment(0).add(4, 'years');
  const endDate = moment(0).add(8, 'years');

  wrapper.find(DateRangePicker).prop('onDatesChange')({
    startDate,
    endDate
  });
  expect(spySetStartDate).toHaveBeenLastCalledWith(startDate);
  expect(spySetEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () => {
  const calendarFocused = 'endDate';
  wrapper.find(DateRangePicker).prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
