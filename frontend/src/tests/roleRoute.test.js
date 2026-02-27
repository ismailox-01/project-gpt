const React = require('react');
const { shallow } = require('enzyme');
const { Navigate } = require('react-router-dom');

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}));

const { useSelector } = require('react-redux');
const RoleRoute = require('../routes/RoleRoute').default;

describe('RoleRoute', () => {
  it('redirige vers login si user absent', () => {
    useSelector.mockReturnValue(null);
    const wrapper = shallow(
      React.createElement(RoleRoute, { roles: ['teacher'] }, React.createElement('div', null, 'child'))
    );
    expect(wrapper.type()).toBe(Navigate);
  });
});
