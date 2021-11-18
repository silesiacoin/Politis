import { createContext, Dispatch, SetStateAction } from 'react';

interface ContextInterface {
  isMetamaskInstalled: boolean;
  isCorrectNetwork: boolean;
  setIsCorrectNetwork: Dispatch<SetStateAction<boolean>>;
  publicAddress: string | null;
  setPublicAddress: Dispatch<SetStateAction<string | null>>;
  universalProfileAddress: string | null;
  setUniversalProfileAddress: Dispatch<SetStateAction<string | null>>;
}
export const Context = createContext<ContextInterface>({
  isMetamaskInstalled: false,
  isCorrectNetwork: true,
  setIsCorrectNetwork: () => false,
  publicAddress: null,
  setPublicAddress: () => '',
  universalProfileAddress: null,
  setUniversalProfileAddress: () => '',
});
