import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrUserData from './currUserData';
import { Context } from '../../App';

test('render installation prompt if metamask is not installed', () => {
  render(
    <Context.Provider
      value={{
        isMetamaskInstalled: false,
        isCorrectNetwork: false,
        setIsCorrectNetwork: () => true,
        publicAddress: null,
        setPublicAddress: () => '',
      }}>
      <CurrUserData />
    </Context.Provider>
  );
  const prompt = screen.getByText(/install metamask extension/i);
  expect(prompt).toBeInTheDocument();
});

test('render connection prompt if metamask is installed', () => {
  render(
    <Context.Provider
      value={{
        isMetamaskInstalled: true,
        isCorrectNetwork: true,
        setIsCorrectNetwork: () => true,
        publicAddress: null,
        setPublicAddress: () => '',
      }}>
      <CurrUserData />
    </Context.Provider>
  );
  const prompt = screen.getByText(/you must connect to your wallet/i);
  expect(prompt).toBeInTheDocument();
});

test('render public address if connected', () => {
  render(
    <Context.Provider
      value={{
        isMetamaskInstalled: true,
        isCorrectNetwork: true,
        setIsCorrectNetwork: () => true,
        publicAddress: '0xaddress',
        setPublicAddress: () => '',
      }}>
      <CurrUserData />
    </Context.Provider>
  );
  const address = screen.getByText(/0xaddress/i);
  expect(address).toBeInTheDocument();
});
