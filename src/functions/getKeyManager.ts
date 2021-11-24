import UniversalProfileContract from '@lukso/universalprofile-smart-contracts/artifacts/UniversalProfile.json';
import KeyManagerContract from '@lukso/universalprofile-smart-contracts/artifacts/LSP6KeyManager.json';
import GetWeb3 from './getWeb3';

interface Props {
    upAddress: string;
}

export default async function GetKeyManager({ upAddress }: Props): Promise<any> {
    const web3 = GetWeb3();
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
