import { ethers, Signer } from 'ethers';

export async function getSigner(): Promise<Signer | null> {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      console.error(new Error('Metamask not installed'));
      return null;
    }

    await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    return signer;
  } catch {
    console.error(new Error('Error signing the message'));
    return null;
  }
}
