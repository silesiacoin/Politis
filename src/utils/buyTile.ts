import UniversalProfileContract from '@lukso/universalprofile-smart-contracts/artifacts/UniversalProfile.json';
import { contractAddress } from '../constants/chain';
import { getCityContract } from '../helpers/getCityContract';
import { getSigner } from '../helpers/getSigner';
import { getWeb3 } from '../helpers/getWeb3';

interface Props {
  currentPrice: number | null | undefined;
  fromAddress: string | null;
  gasPrice: string;
  gasLimit: string;
  tileId: number | undefined;
  upNewOwner: string;
  upAddress: string | null;
}

export async function buyTile({
  currentPrice,
  fromAddress,
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
    // const upAbi: any = UniversalProfileContract.abi;
    // const universalProfile = new web3.eth.Contract(upAbi, upAddress ? upAddress : '');
    // const keyManagerAddress = await universalProfile.methods.owner().call();

    const citiesPayload = citiesContract.methods.buyTile(tileLocator, upNewOwner).encodeABI();
    console.log(citiesPayload);

    if (currentPrice === null || currentPrice === undefined) return;
    const price = web3.utils.toWei(currentPrice.toString());

    const payload = {
      from: fromAddress as string,
      to: contractAddress,
      value: price,
      gasPrice,
      gasLimit,
      data: citiesPayload,
    };

    // const response = await signer.sendTransaction(payload);
    window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [payload],
      })
      .then((hash: string) => console.log(hash))
      .catch((error: any) => console.error(error));
  } catch {
    return new Error('Error fetching buy tile');
  }
}
