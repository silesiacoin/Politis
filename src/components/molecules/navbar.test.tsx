import React from 'react';
import { render, screen } from '@testing-library/react';
import { Context } from '../../App';
import Navbar from './navbar';

test('expect connect button to switch to disconnect after connection', () => {
  const { rerender } = render(
    <Context.Provider
      value={{
        isMetamaskInstalled: true,
        isCorrectNetwork: true,
        setIsCorrectNetwork: () => true,
        publicAddress: null,
        setPublicAddress: () => '',
      }}>
      <Navbar />
    </Context.Provider>
  );

  const connectButton = screen.getByText(/connect wallet/i);
  expect(connectButton).toBeEnabled();

  rerender(
    <Context.Provider
      value={{
        isMetamaskInstalled: true,
        isCorrectNetwork: true,
        setIsCorrectNetwork: () => true,
        publicAddress: '0xaddress',
        setPublicAddress: () => '',
      }}>
      <Navbar />
    </Context.Provider>
  );

  const disconnectButton = screen.getByText(/disconnect wallet/i);
  expect(disconnectButton).toBeEnabled;
});
