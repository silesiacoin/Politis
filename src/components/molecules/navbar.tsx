import React, { ReactElement, Dispatch, SetStateAction } from 'react';
import getAccount from '../../helpers/getAccount';
import Button from '../atoms/button';

type Props = {
  publicAddress: string | null;
  setPublicAddress: Dispatch<SetStateAction<string | null>>;
};

const Navbar = ({ publicAddress, setPublicAddress }: Props): ReactElement => {
  return (
    <nav>
      {publicAddress ? (
        <Button onClick={() => console.log(getAccount())}>
          Disconnect wallet
        </Button>
      ) : (
        <Button onClick={() => 0}>Connect wallet</Button>
      )}
    </nav>
  );
};

export default Navbar;
