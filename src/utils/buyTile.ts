import { gas, gasPrice } from '../constants/chain';
import { getCityContract } from '../helpers/getCityContract';
import { getWeb3 } from '../helpers/getWeb3';

export async function buyTile(
  metamaskAddress: string,
  currentPrice: number,
  tileId: number
): Promise<boolean | Error> {
  const citiesContract = getCityContract();
  const web3 = getWeb3();
  const { estimateGas } = web3.eth;
  try {
    const price = `${currentPrice * 2}`;
    const transaction = {
      from: metamaskAddress,
      gasPrice,
      gas,
      value: price,
    };

    const newGas = await estimateGas(transaction);
    transaction.gas = `${newGas * 10}`;

    const response = await citiesContract.methods
      .buyTile(tileId)
      .send(transaction)

    return response?.status ? response?.status : new Error('MetaMask');
  } catch {
    return new Error('MetaMask');
  }
}
