import { gas, gasPrice } from '../constants/chain';
import { getCityContract } from '../helpers/getCityContract';
import { getWeb3 } from '../helpers/getWeb3';

export async function buyTile(
  metamaskAddress: string,
  currentPrice: number,
  tileId: number,
  upNewOwner: string
): Promise<void | Error> {
  const citiesContract = getCityContract();
  const web3 = getWeb3();
  const { estimateGas } = web3.eth;
  try {
    const price = `${currentPrice * 2 + 0.2}`;
    const transaction = {
      from: metamaskAddress,
      gasPrice,
      gas,
      value: price,
    };

    estimateGas(transaction)
      .then(async (newGas: number) => {
        transaction.gas = `${newGas * 10}`;

        citiesContract.methods
          .buyTile(tileId, upNewOwner)
          .send(transaction)
          .then((res: any) => console.log(res))
          .catch((err: Error) => console.error(err));
      })
      .catch((err) => console.error(err));
  } catch {
    return new Error('Error fetching buy tile');
  }
}
