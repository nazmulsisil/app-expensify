import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should render LoginPage correctly', () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
  const spyStartLogin = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={spyStartLogin} />);
  wrapper.find('button').simulate('click');
  expect(spyStartLogin).toHaveBeenCalled();
});
