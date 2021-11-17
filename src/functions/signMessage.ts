import { ethers } from 'ethers';

interface SignedMessage {
  message: string;
  signature: string;
}

export async function signMessage(
  message: string
): Promise<SignedMessage | null> {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      console.error(new Error('Metamask not installed'));
      return null;
    }

    await ethereum.send('eth_requestAccounts');
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);

    return {
      message,
      signature,
    };
  } catch {
    console.error(new Error('Error signing the message'));
    return null;
  }
}
