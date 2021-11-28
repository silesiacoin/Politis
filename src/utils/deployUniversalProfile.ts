import { Dispatch, SetStateAction } from 'react';
import { DeploymentEvent, LSPFactory, ProfileDataBeforeUpload } from '@lukso/lsp-factory.js';
import { Signer } from 'ethers';
import { RPC_URL } from '../constants/chain';

const provider = RPC_URL;

export function deployUniversalProfile(
  publicAddress: string,
  signer: Signer,
  profileData: ProfileDataBeforeUpload,
  setEventCount: Dispatch<SetStateAction<number>>,
  setLatestEvent: Dispatch<SetStateAction<DeploymentEvent | null>>,
  setComplete: Dispatch<SetStateAction<boolean>>
): void {
  let count = 0;
  const lspFactory = new LSPFactory(provider, signer);
  lspFactory.LSP3UniversalProfile.deployReactive({
    controllingAccounts: [publicAddress],
    lsp3Profile: profileData,
  }).subscribe({
    next: (event) => {
      setLatestEvent(event);
      count++;
      setEventCount(count);
    },
    complete: () => setComplete(true),
  });
}
