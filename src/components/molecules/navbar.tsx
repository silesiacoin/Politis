import React, { ReactElement, Dispatch, SetStateAction } from 'react';
import connectMetamask from '../../functions/connectMetamask';
import Button from '../atoms/button';
import ChangeNetworkDiv from '../atoms/changeNetworkDiv';

type Props = {
  isCorrectNetwork: boolean | null;
  setIsCorrectNetwork: Dispatch<SetStateAction<boolean>>;
  publicAddress: string | null;
  setPublicAddress: Dispatch<SetStateAction<string | null>>;
};

export default function Navbar({
  isCorrectNetwork,
  setIsCorrectNetwork,
  publicAddress,
  setPublicAddress,
}: Props): ReactElement {
  const handleConnect = async () => {
    const { isCorrectNetwork, account } = await connectMetamask();
    if (!isCorrectNetwork) return setIsCorrectNetwork(false);
    setIsCorrectNetwork(true);
    setPublicAddress(account);
  };
  const handleDisconnect = () => setPublicAddress(null);

  return (
    <nav>
      {publicAddress ? (
        <Button onClick={(): void => handleDisconnect()}>
          Disconnect wallet
        </Button>
      ) : (
        <Button onClick={(): any => handleConnect()}>Connect wallet</Button>
      )}
      {!isCorrectNetwork && <ChangeNetworkDiv />}
    </nav>
  );
}
