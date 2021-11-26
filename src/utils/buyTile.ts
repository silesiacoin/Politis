import UniversalProfileContract from '@lukso/universalprofile-smart-contracts/artifacts/UniversalProfile.json';
import { contractAddress } from '../constants/chain';
import { getCityContract } from '../helpers/getCityContract';
import { getSigner } from '../helpers/getSigner';
import { getWeb3 } from '../helpers/getWeb3';

interface Props {
  currentPrice: number | null | undefined;
  fromAddress: string | null;
  currentOwner: string | null | undefined;
  gasPrice: string;
  gasLimit: string;
  tileId: number | undefined;
  upNewOwner: string;
  upAddress: string | null;
}

export async function buyTile({
  currentPrice,
  fromAddress,
  currentOwner,
  gasPrice,
  gasLimit,
  tileId,
  upNewOwner,
  upAddress,
}: Props): Promise<void | Error> {
  const web3 = getWeb3();

  try {
    const citiesContract = getCityContract();
    const tileLocator = tileId;
    const myAbi: any = UniversalProfileContract.abi;

    const myUniversalProfile = new web3.eth.Contract(myAbi, upAddress ? upAddress : '');

    console.log(citiesContract.methods.buyTile(tileLocator, upNewOwner));

    const citiesPayload = citiesContract.methods.buyTile(tileLocator, upNewOwner).encodeABI();

    if (currentPrice === null || currentPrice === undefined) return;

    const abiPayload = await myUniversalProfile.methods
      .execute(0, contractAddress, web3.utils.toWei(currentPrice.toString()), citiesPayload)
      .encodeABI();

    const signer = await getSigner();
    console.log(signer);
    if (!signer) return;

    const payload = {
      from: fromAddress as string,
      to: currentOwner as string,
      gasPrice: '1000000',
      gasLimit,
      data: abiPayload,
    };

    // const response = await signer.sendTransaction(payload);
    const response = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [payload],
    });
    console.log(response);
  } catch {
    return new Error('Error fetching buy tile');
  }
}
