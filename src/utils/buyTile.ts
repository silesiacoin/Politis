import { AbiItem } from 'web3-utils';
import { contractAddress } from '../constants/chain';
import { citiesAbi } from '../constants/abi';
import { getCityContract } from '../helpers/getCityContract';
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
}: Props): Promise<void | Error> {
  const web3 = getWeb3();

  try {
    const citiesContract = getCityContract();
    const tileLocator = tileId;
    const buyTileAbi = citiesAbi[1] as AbiItem;
    const citiesPayload = await web3.eth.abi.encodeFunctionCall(
      buyTileAbi,
      citiesContract.methods.buyTile(tileLocator, upNewOwner)
    );
    // citiesContract.methods.buyTile(tileLocator, upNewOwner);

    console.log(citiesPayload);
    if (currentPrice === null || currentPrice === undefined) return;
    const price = web3.utils.toWei(currentPrice.toString());

    console.log(price, gasPrice, gasLimit);

    const payload = {
      from: fromAddress as string,
      to: contractAddress,
      value: price,
      gasPrice,
      gas: gasLimit,
      data: citiesPayload,
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
