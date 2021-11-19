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
import { LSP3Profile } from '@lukso/lsp-factory.js';
import UpLoginForm from './components/organisms/upLoginForm';

declare global {
  interface Window {
    ethereum: any;
  }
}

declare type universalProfile = LSP3Profile | null;
interface ContextInterface {
  isMetamaskInstalled: boolean;
  isCorrectNetwork: boolean;
  setIsCorrectNetwork: Dispatch<SetStateAction<boolean>>;
  publicAddress: string | null;
  setPublicAddress: Dispatch<SetStateAction<string | null>>;
  universalProfile: universalProfile;
  setUniversalProfile: Dispatch<SetStateAction<universalProfile>>;
}
export const Context = createContext<ContextInterface>({
  isMetamaskInstalled: false,
  isCorrectNetwork: true,
  setIsCorrectNetwork: () => false,
  publicAddress: null,
  setPublicAddress: () => '',
  universalProfile: null,
  setUniversalProfile: () => null,
});

const { ethereum } = window;

export default function App(): ReactElement {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(true);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(true);
  const [publicAddress, setPublicAddress] = useState<string | null>(null);
  const [universalProfile, setUniversalProfile] =
    useState<universalProfile | null>(null);

  console.log(universalProfile);
  

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
        universalProfile,
        setUniversalProfile,
      }}>
      <Header />
      <UpLoginForm />
    </Context.Provider>
  );
}
