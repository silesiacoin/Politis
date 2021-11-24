import getCityContract from './getCityContract';
import GetKeyManager from './getKeyManager';
import GetWeb3 from './getWeb3';

interface Props {
  currentPrice: string;
  from: string;
  gasPrice: number;
  gas: number;
  tileLocator: number | undefined;
  upBuyerAddress: string;
}

export function buyTile({ currentPrice, from, gasPrice, gas, tileLocator, upBuyerAddress }: Props): void | Error {
  // const web3 = GetWeb3();

  const keyManager = GetKeyManager({
    upAddress: upBuyerAddress
  });

  const transactionObject = {
    from: from,
    gas: gas,
    gasPrice: gasPrice,
    value: currentPrice,
  };

  try {

    // KET MANAGER EXECUTE

    //@ts-ignore
    keyManager.methods.execute()



    // OLD POLITIS BUY TILE FUNCTION

    // web3.eth.estimateGas(transactionObject)
    //   .then((gas: number) => {
    //     const transactionObject = gas * 10;
    //     const citiesContract = getCityContract();
    //     citiesContract.methods.buyTile(tileLocator, upBuyerAddress).send(transactionObject, () => {
    //       console.log('buy success')
    //       return;
    //     });
    //   })
  } catch {
    return new Error('Error fetching buy tile');
  }
}
