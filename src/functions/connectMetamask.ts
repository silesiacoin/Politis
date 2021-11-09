interface MetamaskResponse {
  isCorrectNetwork: boolean;
  account: string | null;
}

export default async function connectMetamask(): Promise<MetamaskResponse> {
  const ethereum = window.ethereum;

  if (ethereum.networkVersion !== '22')
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
