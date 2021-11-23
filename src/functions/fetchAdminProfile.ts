import { getAdminSchema } from '../constants/erc725schemas';
import getERC725Instance from './getERC725Instance';

export default async function fetchAdminProfile(
  address: string,
  metamaskAddress: string | null
): Promise<any> {
  const subMetamaskAddress = metamaskAddress?.substr(2);
  if (subMetamaskAddress) {
    const schema = getAdminSchema();
    const erc725 = getERC725Instance(address, schema);
    try {
      return erc725.fetchData();
    } catch {
      return new Error('Error fetching universal profile assets data');
    }
  }
  return new Error('Metamask not connected');
}
