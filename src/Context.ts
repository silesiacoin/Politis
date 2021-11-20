import { createContext, Dispatch, SetStateAction } from 'react';

interface ContextInterface {
  isMetamaskInstalled: boolean;
  isCorrectNetwork: boolean;
  setIsCorrectNetwork: Dispatch<SetStateAction<boolean>>;
  publicAddress: string | null;
  setPublicAddress: Dispatch<SetStateAction<StateString>>;
  universalProfileJSON: UniversalProfile;
  setUniversalProfileJSON: Dispatch<SetStateAction<UniversalProfile>>;
  universalProfileAddress: StateString;
  setUniversalProfileAddress: Dispatch<SetStateAction<StateString>>;
}
export const Context = createContext<ContextInterface>({
  isMetamaskInstalled: false,
  isCorrectNetwork: true,
  setIsCorrectNetwork: () => false,
  publicAddress: null,
  setPublicAddress: () => '',
  universalProfileJSON: null,
  setUniversalProfileJSON: () => null,
  universalProfileAddress: null,
  setUniversalProfileAddress: () => '',
});
