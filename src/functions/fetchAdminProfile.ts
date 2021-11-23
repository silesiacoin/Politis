import { LSP3Profile } from '@lukso/lsp-factory.js';
import { getAdminSchema } from '../constants/erc725schemas';
import getERC725Instance from './getERC725Instance';

export default async function fetchAdminProfile(
  address: string,
  metamaskAddress: string | null
): Promise<LSP3Profile | Error> {
  const subMetamaskAddress = metamaskAddress?.substr(2);
  if (subMetamaskAddress) {
    const schema = getAdminSchema();
    const erc725 = getERC725Instance(address, schema);

    try {
      console.log('1.1')
      console.log(erc725.fetchData())
      const fetchPermissions = await erc725.fetchData();

    } catch {
      return new Error('Error fetching universal profile data');
    }
  }
  return new Error('Metamask not connected');
}
