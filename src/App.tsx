import React, { useState, useEffect, ReactElement } from 'react';
import './scss/main.scss';
import Header from './components/organisms/header';

declare global {
  interface Window {
    ethereum: any;
  }
}

const { ethereum } = window;

export default function App(): ReactElement {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const [publicAddress, setPublicAddress] = useState<string | null>(null);

  useEffect(() => {
    if (ethereum.isMetamask) {
      setIsMetamaskInstalled(true);
    }

    return () => {
      setIsMetamaskInstalled(false);
    };
  }, []);

  // if metamask is not installed display pop up prompting install

  return (
    <React.Fragment>
      <Header
        isMetamaskInstalled={isMetamaskInstalled}
        publicAddress={publicAddress}
        setPublicAddress={setPublicAddress}
      />
    </React.Fragment>
  );
}
