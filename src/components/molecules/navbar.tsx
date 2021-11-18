import React, { useContext, ReactElement } from 'react';
import { Context } from '../../Context';
import connectMetamask from '../../functions/connectMetamask';
import Button from '../atoms/button';
import ChangeNetworkDiv from '../atoms/changeNetworkDiv';

export default function Navbar(): ReactElement {
  const {
    isCorrectNetwork,
    setIsCorrectNetwork,
    publicAddress,
    setPublicAddress,
  } = useContext(Context);

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
        <Button
          onClick={(): any => handleConnect()}
          disabled={!isCorrectNetwork ? true : false}>
          Connect wallet
        </Button>
      )}
      {!isCorrectNetwork && <ChangeNetworkDiv />}
    </nav>
  );
}
