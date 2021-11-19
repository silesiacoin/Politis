import { LSPFactory, ProfileDataBeforeUpload } from '@lukso/lsp-factory.js';
import { Signer } from 'ethers';
import { RPC_URL } from '../constants/chain';

const provider = RPC_URL;

export async function deployUP(
  publicAddress: string,
  signer: Signer,
  profileData: ProfileDataBeforeUpload
): Promise<string> {
  const lspFactory = new LSPFactory(provider, signer);
  const contract = await lspFactory.LSP3UniversalProfile.deploy({
    controllingAccounts: [publicAddress],
    lsp3Profile: profileData,
  });
  const contractAddress = contract.ERC725Account.address;
  return contractAddress;
}
