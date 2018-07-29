import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

let wrapper, spyStartLogout;
beforeEach(() => {
  spyStartLogout = jest.fn();
  wrapper = shallow(<Header startLogout={spyStartLogout} />);
});

test('should render Header component', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call start log out on button click', () => {
  wrapper.find('button').simulate('click');
  expect(spyStartLogout).toHaveBeenCalled();
});
