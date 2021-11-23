import LSP8IdentifiableDigitalAsset from '@lukso/universalprofile-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';
import KeyManager from '@lukso/universalprofile-smart-contracts/artifacts/LSP6KeyManager.json';
import { LSPFactory } from '@lukso/lsp-factory.js';
import { RPC_URL } from '../constants/chain';
import { getSigner } from './getSigner';
import Web3 from 'web3';
import fetchAssetData from './fetchAssetData';

export default async function deployAssets(
  id: number,
  universalProfileAddress: string,
  metamaskAddress: string
): Promise<void> {
  const provider = RPC_URL;
  const web3 = new Web3(window.ethereum);
  const signer = await getSigner();
  const keyManagerAbi: any = KeyManager.abi;
  const lsp8Abi: any = LSP8IdentifiableDigitalAsset.abi;
  if (signer) {
    try {
      const lspFactory = await new LSPFactory(provider, signer);
      const asset = await lspFactory.DigitalAsset.deployLSP8IdentifiableDigitalAsset({
        name: `Politis tile #${id}`,
        symbol: 'POL',
        ownerAddress: universalProfileAddress,
      });
      const assetAddress = asset.LSP8IdentifiableDigitalAsset.address;

      const universalProfileContract = new web3.eth.Contract(lsp8Abi, universalProfileAddress);
      const keyManagerAddress = await universalProfileContract.methods.owner().call();
      const keyManagerContract = new web3.eth.Contract(keyManagerAbi, keyManagerAddress);
      const upPayload = await universalProfileContract.methods
        .setData(['0x3a47ab5bd3a594c3a8995f8fa58d0876c96819ca4516bd76100c92462f2f9dc0'], [assetAddress])
        .encodeABI();
      keyManagerContract.methods.execute(upPayload).send({ from: metamaskAddress, gas: 475_000 });
      console.log('assetAddress: ' + assetAddress)
      const assetData = fetchAssetData(assetAddress);
      console.log(assetData);
    } catch (error) {
      console.error('error deploying the asset', error);
    }
  }
}
