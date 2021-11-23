import React, { useState, useEffect, ReactElement } from 'react';
import { Context } from './Context';
import './scss/main.scss';
import Header from './components/organisms/header';
import { LSP3Profile } from '@lukso/lsp-factory.js';
import UpLogin from './components/organisms/upLogin';
import Container from './components/atoms/container';
import UpRegistration from './components/organisms/upRegistration';
import World from './components/organisms/world';
import PanelUp from './components/organisms/panelUP';

declare global {
  interface Window {
    ethereum: any;
  }
  type StateString = string | null;
  type UniversalProfile = LSP3Profile | null;
}


const { ethereum } = window;

export default function App(): ReactElement {
  const [shouldRenderRegistration, setShouldRenderRegistration] = useState(false)
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(true);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(true);
  const [publicAddress, setPublicAddress] = useState<StateString>(null);
  const [universalProfileJSON, setUniversalProfileJSON] = useState<UniversalProfile>(null);
  const [universalProfileAddress, setUniversalProfileAddress] = useState<StateString>(null);

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
        universalProfileJSON,
        setUniversalProfileJSON,
        universalProfileAddress,
        setUniversalProfileAddress,
      }}>
      <Container className='dashboard'>
        <Header />
        {publicAddress ? (
          universalProfileJSON ? (
            <World />
          ) : (
            <Container className='dashboard__container'>
              {shouldRenderRegistration ? (
                <UpRegistration setShouldRenderRegistration={setShouldRenderRegistration} />
              ) : (
                <UpLogin setShouldRenderRegistration={setShouldRenderRegistration} />
              )}
            </Container>
          )
        ) : (
          <Container className='dashboard__container'>Please connect your wallet</Container>
        )}
        <PanelUp />
      </Container>
    </Context.Provider>
  );
}
