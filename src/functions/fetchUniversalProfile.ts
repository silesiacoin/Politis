import { LSP3Profile, LSP3ProfileJSON } from '@lukso/lsp-factory.js';
import getERC725Instance from './getERC725Instance';

export default async function fetchUniversalProfile(
  address: string,
  metamaskAddress: string | null
): Promise<LSP3Profile | Error> {
  const erc725 = getERC725Instance(address);
  console.log(erc725.fetchData());
  try {
    const fetchPermissions = await erc725.fetchData();
    const permissionsArray = fetchPermissions['AddressPermissions[]'] as string[];
    if (permissionsArray.some((permission) => permission === metamaskAddress)) {
      const fetchProfile = await erc725.fetchData('LSP3Profile');
      const profileJSON = fetchProfile['LSP3Profile'] as LSP3ProfileJSON;
      return profileJSON.LSP3Profile;
    } else {
      return new Error('Error account is not the owner of universal profile');
    }
  } catch {
    return new Error('Error fetching universal profile data');
  }
}
