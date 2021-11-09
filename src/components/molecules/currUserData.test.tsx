import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrUserData from './currUserData';

test('renders current user data', () => {
  render(<CurrUserData />);
  const userName = screen.getByText(/0xboilerplate/i);
  expect(userName).toBeInTheDocument();
});
