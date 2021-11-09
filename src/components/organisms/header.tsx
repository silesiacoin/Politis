import React, { ReactElement, Dispatch, SetStateAction } from 'react';
import CurrUserData from '../molecules/currUserData';
import Navbar from '../molecules/navbar';

type Props = {
  isMetamaskInstalled: boolean;
  publicAddress: string | null;
  setPublicAddress: Dispatch<SetStateAction<string | null>>;
};

export default function Header({
  publicAddress,
  setPublicAddress,
}: Props): ReactElement {
  return (
    <header className='header'>
      <CurrUserData publicAddress={publicAddress} />
      <Navbar
        publicAddress={publicAddress}
        setPublicAddress={setPublicAddress}
      />
    </header>
  );
}
