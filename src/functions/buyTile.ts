import Web3 from 'web3';
import getCityContract from './getCityContract';

interface Props {
  currentPrice: string;
  from: string;
  gasPrice: number;
  gas: number;
  tileLocator: number | undefined;
  upAddress: string;
}

export function buyTile({ currentPrice, from, gasPrice, gas, tileLocator, upAddress }: Props): void | Error {
  const web3 = new Web3(window.ethereum);

  const transactionObject = {
    from: from,
    gas: gas,
    gasPrice: gasPrice,
    value: currentPrice,
  };

  try {
    // web3.eth.estimateGas(transactionObject)
    //   .then((gas: number) => {
    //     const transactionObject = gas * 10;
    //     const citiesContract = getCityContract();
    //     citiesContract.methods.buyTile(tileLocator, upAddress).send(transactionObject, () => {
    //       console.log('buy success')
    //       return;
    //     });
    //   })
  } catch {
    return new Error('Error fetching buy tile');
  }
}
