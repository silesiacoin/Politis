import { ethers, Signer } from 'ethers';
interface SignMessageResponse {
  signer: Signer;
  signature: string;
}

export async function signMessage(
  message: string
): Promise<SignMessageResponse | null> {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      console.error(new Error('Metamask not installed'));
      return null;
    }

    await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);

    return {
      signer,
      signature,
    };
  } catch {
    console.error(new Error('Error signing the message'));
    return null;
  }
}
