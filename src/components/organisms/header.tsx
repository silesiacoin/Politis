import React, { ReactElement, Dispatch, SetStateAction } from 'react';
import CurrUserData from '../molecules/currUserData';
import Navbar from '../molecules/navbar';

type Props = {
  isMetamaskInstalled: boolean;
  isCorrectNetwork: boolean | null;
  setIsCorrectNetwork: Dispatch<SetStateAction<boolean>>;
  publicAddress: string | null;
  setPublicAddress: Dispatch<SetStateAction<string | null>>;
};

export default function Header({
  isMetamaskInstalled,
  isCorrectNetwork,
  setIsCorrectNetwork,
  publicAddress,
  setPublicAddress,
}: Props): ReactElement {
  return (
    <header className='header'>
      <CurrUserData publicAddress={publicAddress} />
      <Navbar
        isCorrectNetwork={isCorrectNetwork}
        setIsCorrectNetwork={setIsCorrectNetwork}
        publicAddress={publicAddress}
        setPublicAddress={setPublicAddress}
      />
    </header>
  );
}
