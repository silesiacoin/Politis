import { LSPFactory, ProfileDataBeforeUpload } from '@lukso/lsp-factory.js';
import { RPC_URL, CHAIN_ID } from '../constants/chain';

const provider = RPC_URL;
const chainId = CHAIN_ID;

export async function deployUP(
  signature: string,
  profileData: ProfileDataBeforeUpload
): Promise<string> {
  const lspFactory = new LSPFactory(provider, {
    deployKey: signature,
    chainId,
  });
  const contract = await lspFactory.LSP3UniversalProfile.deploy({
    controllingAccounts: [signature],
    lsp3Profile: profileData,
  });
  const contractAddress = contract.ERC725Account.address;
  return contractAddress;
}
