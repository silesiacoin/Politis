import UniversalProfileContract from '@lukso/universalprofile-smart-contracts/artifacts/UniversalProfile.json';
import KeyManagerContract from '@lukso/universalprofile-smart-contracts/artifacts/LSP6KeyManager.json';
import { getWeb3 } from './getWeb3';

interface Props {
  upAddress: string;
}

export async function getKeyManager({ upAddress }: Props): Promise<any | Error> {
  const web3 = getWeb3();
  const abi: any = UniversalProfileContract.abi;
  const managerAbi: any = KeyManagerContract.abi;
  try {
    const myUniversalProfile = new web3.eth.Contract(abi, upAddress);
    const keyManagerAddress = await myUniversalProfile.methods.owner().call();
    const keyManager = new web3.eth.Contract(managerAbi, keyManagerAddress);
    return keyManager;
  } catch (error) {
    return new Error('Error get key menager');
  }
}
