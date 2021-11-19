import { LSP3Profile, LSP3ProfileJSON } from '@lukso/lsp-factory.js';
import getERC725Instance from './getERC725Instance';

export default async function fetchUniversalProfile(
  address: string,
  metamaskAddress: string | null
): Promise<LSP3Profile | Error> {
  const subMetamaskAddress = metamaskAddress?.substr(2);
  const erc725 = getERC725Instance(address, subMetamaskAddress);
  try {
    const fetchPermissions = await erc725.fetchData();
    const permission = fetchPermissions[
      `AddressPermissions:Permissions:${subMetamaskAddress}`
    ] as string;
    if (permission) {
      const fetchProfile = await erc725.fetchData('LSP3Profile');
      const profileJSON = fetchProfile['LSP3Profile'] as LSP3ProfileJSON;
      return profileJSON.LSP3Profile;
    } else {
      return new Error('Error account does not have permissions to manage this universal profile');
    }
  } catch {
    return new Error('Error fetching universal profile data');
  }
}
