import moment from 'moment';

export const filtersDefault = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

export const filtersAlternative = {
  text: 'bill',
  sortBy: 'amount',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};
