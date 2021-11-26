import React, { useContext, ReactElement, useState, useEffect } from 'react';
import { Context } from '../../Context';
import connectMetamask from '../../utils/connectMetamask';
import Button from '../atoms/button';
import ChangeNetworkDiv from '../atoms/changeNetworkDiv';

export default function Navbar(): ReactElement {
  const {
    isCorrectNetwork,
    setIsCorrectNetwork,
    publicAddress,
    setPublicAddress,
    universalProfileJSON,
    setUniversalProfileJSON,
  } = useContext(Context);
  const [startGame, setStartGame] = useState(true);

  const handleConnect = async () => {
    const { isCorrectNetwork, account } = await connectMetamask();
    if (!isCorrectNetwork) return setIsCorrectNetwork(false);
    setIsCorrectNetwork(true);
    setPublicAddress(account);
  };

  const handleDisconnect = () => setPublicAddress(null);

  useEffect(() => {
    async function start() {
      const { isCorrectNetwork, account } = await connectMetamask();
      if (!isCorrectNetwork) return setIsCorrectNetwork(false);
      setIsCorrectNetwork(true);
      setPublicAddress(account);
      return setStartGame(false);
    }
    if (startGame) {
      start();
    }
  }, [setIsCorrectNetwork, setPublicAddress, startGame]);

  return (
    <nav>
      {publicAddress ? (
        <Button onClick={() => handleDisconnect()}>Disconnect wallet</Button>
      ) : (
        <Button onClick={() => handleConnect()} disabled={!isCorrectNetwork ? true : false}>
          Connect wallet
        </Button>
      )}
      {!isCorrectNetwork && <ChangeNetworkDiv />}
      {universalProfileJSON && (
        <Button onClick={() => setUniversalProfileJSON(null)}>Disconnect UP</Button>
      )}
    </nav>
  );
}
