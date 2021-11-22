import LSP8IdentifiableDigitalAsset from '@lukso/universalprofile-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';
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
  const web3 = new Web3();
  const signer = await getSigner();
  const provider = RPC_URL;
  const subMetamaskAddress = metamaskAddress?.substr(2);
  const schema = getAdminSchema(subMetamaskAddress);
  const erc725 = getERC725Instance(universalProfileAddress, schema);
  const previousERC725Data = await erc725.getData([
    'SupportedStandards:ERC725Account',
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

      console.log(asset);
      console.log('chyba adres kontraktu: ', assetAddress);

      const encodedData = erc725.encodeData({
        ...previousERC725Data,
        'LSP3IssuedAssets[]': [assetAddress],
      });
      console.log(encodedData);

      const dataToSaveOnChain = flattenEncodedData(encodedData);
      console.log(dataToSaveOnChain);
      dataToSaveOnChain.forEach(({ key, value }) => console.log(key, value));

      const abi: any = LSP8IdentifiableDigitalAsset.abi;
      const erc725Contract = new web3.eth.Contract(abi, universalProfileAddress);
      console.log(erc725Contract);

      const arrayOfPromises = dataToSaveOnChain.map(
        async ({ key, value }) => await erc725Contract.methods.setData(key, value).send()
      );
      console.log(arrayOfPromises);
      const saved = await Promise.all(arrayOfPromises);
      console.log(saved);
    } catch (error) {
      console.error('error deploying the asset', error);
    }
  }
}
