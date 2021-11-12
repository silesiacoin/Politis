import { LSPFactory, ProfileDataBeforeUpload } from '@lukso/lsp-factory.js';
import { RPC_URL, CHAIN_ID } from '../constants/chain';

const deployKey = '0x...'; // Private key of the account which will deploy UPs
const provider = RPC_URL;
const chainId = CHAIN_ID;

const lspFactory = new LSPFactory(provider, {
  deployKey,
  chainId,
});

export default async function deployUP(
  publicAddress: string,
  profileData: ProfileDataBeforeUpload
): Promise<string> {
  const contract = await lspFactory.LSP3UniversalProfile.deploy({
    controllingAccounts: [publicAddress],
    lsp3Profile: profileData,
  });
  const contractAddress = contract.ERC725Account.address;
  return contractAddress;
}
