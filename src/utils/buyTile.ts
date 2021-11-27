import { getCityContract } from '../helpers/getCityContract';
import { getWeb3 } from '../helpers/getWeb3';

export async function buyTile(
  metamaskAddress: string,
  currentPrice: number,
  tileId: number,
  upNewOwner: string
): Promise<void | Error> {
  const web3 = getWeb3();
  const citiesContract = getCityContract();
  const { toWei } = web3.utils;
  try {
    const gasPrice = '0x09184e72a000';
    const gas = '0x6270';
    const price = `0x${toWei(currentPrice.toString())}`;
    const transaction = {
      from: metamaskAddress,
      gasPrice,
      gas,
      value: price,
    };

    citiesContract.methods
      .buyTile(tileId, upNewOwner)
      .send(transaction)
      .then((res: any) => console.log(res))
      .catch((err: Error) => console.error(err));
  } catch {
    return new Error('Error fetching buy tile');
  }
}
