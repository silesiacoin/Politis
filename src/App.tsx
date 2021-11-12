import React, {
  useState,
  useEffect,
  createContext,
  ReactElement,
  Dispatch,
  SetStateAction,
} from 'react';
import './scss/main.scss';
import Header from './components/organisms/header';

declare global {
  interface Window {
    ethereum: any;
  }
}

interface ContextInterface {
  isMetamaskInstalled: boolean;
  isCorrectNetwork: boolean;
  setIsCorrectNetwork: Dispatch<SetStateAction<boolean>>;
  publicAddress: string | null;
  setPublicAddress: Dispatch<SetStateAction<string | null>>;
}
export const Context = createContext<ContextInterface>({
  isMetamaskInstalled: false,
  isCorrectNetwork: true,
  setIsCorrectNetwork: () => false,
  publicAddress: null,
  setPublicAddress: () => '',
});

const { ethereum } = window;

export default function App(): ReactElement {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(true);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(true);
  const [publicAddress, setPublicAddress] = useState<string | null>(null);

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
      }}>
      <Header />
    </Context.Provider>
  );
}
