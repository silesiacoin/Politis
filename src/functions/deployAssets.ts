import LSP8IdentifiableDigitalAsset from '@lukso/universalprofile-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';
import KeyManager from '@lukso/universalprofile-smart-contracts/artifacts/LSP6KeyManager.json';
import { LSPFactory } from '@lukso/lsp-factory.js';
import { flattenEncodedData } from '@erc725/erc725.js';
import { RPC_URL } from '../constants/chain';
import { getSigner } from './getSigner';
import getERC725Instance from './getERC725Instance';
import Web3 from 'web3';
import { getAdminSchema } from '../constants/erc725schemas';

export default async function deployAssets(
  id: number,
  universalProfileAddress: string,
  metamaskAddress: string
): Promise<void> {
  const provider = RPC_URL;
  const web3 = new Web3(window.ethereum);
  const signer = await getSigner();
  const subMetamaskAddress = metamaskAddress?.substr(2);
  const schema = getAdminSchema(subMetamaskAddress);
  const erc725 = getERC725Instance(universalProfileAddress, schema);
  const previousERC725Data = await erc725.getData([
    'LSP3Profile',
    'LSP1UniversalReceiverDelegate',
    `AddressPermissions:Permissions:${subMetamaskAddress}`,
  ]);
  console.log(previousERC725Data);
  //   const previousIssuedAssets = erc725.getData('IssuedAssets[]');

  if (signer) {
    try {
      const lspFactory = await new LSPFactory(provider, signer);
      const asset = await lspFactory.DigitalAsset.deployLSP8IdentifiableDigitalAsset({
        name: `Politis tile #${id}`,
        symbol: 'POL',
        ownerAddress: universalProfileAddress,
      });
      const assetAddress = asset.LSP8IdentifiableDigitalAsset.address;

      console.log(assetAddress);

      const encodedData = erc725.encodeData({
        ...previousERC725Data,
        'LSP3IssuedAssets[]': [assetAddress],
      });

      const dataToSaveOnChain = flattenEncodedData(encodedData);
      console.log(dataToSaveOnChain);

      const keyManagerAbi: any = KeyManager.abi;
      const keyManagerContract = new web3.eth.Contract(
        keyManagerAbi,
        '0x997c07250887170ae47b512df50341c36d7c7d82'
      );

      const universalProfileAbi: any = LSP8IdentifiableDigitalAsset.abi;
      const erc725Contract = new web3.eth.Contract(universalProfileAbi, universalProfileAddress);
      console.log(erc725Contract);
      console.log(await erc725Contract.methods.owner().call());

      const keys = dataToSaveOnChain.map(({ key }) => key);
      const values = dataToSaveOnChain.map(({ value }) => value);

      const payload = await erc725Contract.methods.setData(keys, values).encodeABI();

      keyManagerContract.methods.execute(payload).send({ from: metamaskAddress, gas: 475_000 });
    } catch (error) {
      console.error('error deploying the asset', error);
    }
  }
}
