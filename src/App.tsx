import React, { useState, useEffect, ReactElement } from 'react';
import { Context } from './Context';
import './scss/main.scss';
import Header from './components/organisms/header';
import Container from './components/organisms/container';
import UpRegistration from './components/organisms/upRegistration';
import World from './components/organisms/world';

declare global {
  interface Window {
    ethereum: any;
  }
  type StateString = string | null;
}

const { ethereum } = window;

export default function App(): ReactElement {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(true);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(true);
  const [publicAddress, setPublicAddress] = useState<StateString>(null);
  const [universalProfileAddress, setUniversalProfileAddress] =
    useState<StateString>(null);

  useEffect(() => {
    if (typeof ethereum === undefined) {
      setIsMetamaskInstalled(false);
    }

    return () => {
      setIsMetamaskInstalled(true);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        isMetamaskInstalled,
        isCorrectNetwork,
        setIsCorrectNetwork,
        publicAddress,
        setPublicAddress,
        universalProfileAddress,
        setUniversalProfileAddress,
      }}>
      <Container className='dashboard'>
        <Header />
        <Container className='dashboard__container'>
          {publicAddress ? (
            <UpRegistration />
          ) : (
            <p>Please connect your wallet</p>
          )}
        </Container>
      </Container>
      <World />
    </Context.Provider>
  );
}
