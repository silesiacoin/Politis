import { CHAIN_ID } from '../constants/chain';

interface MetamaskResponse {
  isCorrectNetwork: boolean;
  account: string | null;
}

export default async function connectMetamask(): Promise<MetamaskResponse> {
  const ethereum = window.ethereum;

  if (ethereum.networkVersion != CHAIN_ID)
    return {
      isCorrectNetwork: false,
      account: null,
    };

  const accounts = await ethereum.request({
    method: 'eth_requestAccounts',
  });

  return {
    isCorrectNetwork: true,
    account: accounts[0],
  };
}
