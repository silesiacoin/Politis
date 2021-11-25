import getCityContract from './getCityContract';
import GetKeyManager from './getKeyManager';
import GetWeb3 from './getWeb3';
import UniversalProfileContract from '@lukso/universalprofile-smart-contracts/artifacts/UniversalProfile.json';

interface Props {
  currentPrice: number | null | undefined;
  fromAddress: string | null;
  gasPrice: string;
  gas: string;
  tileId: number | undefined;
  upNewOwner: string;
  upAddress: string | null;
}

export async function buyTile({ currentPrice, fromAddress, gasPrice, gas, tileId, upNewOwner, upAddress }: Props): Promise<void | Error> {
  const web3 = GetWeb3();
  console.log('click');

  const keyManager = GetKeyManager({
    upAddress: upNewOwner
  });

  const transactionObject = {
    from: fromAddress ? fromAddress : '',
    gas: gas,
    gasPrice: gasPrice,
    value: currentPrice ? currentPrice : '',
  };

  try {
    const citiesContract = getCityContract();
    const tileLocator = `0x${tileId}`;
    const myAbi: any = UniversalProfileContract.abi;

    console.log('1');

    const myUniversalProfile = new web3.eth.Contract(myAbi, upAddress ? upAddress : '');

    console.log('2');
    console.log(myUniversalProfile);

    const payload = citiesContract.methots.buyTile(tileLocator, upNewOwner).encodeABI();

    console.log('3');
    console.log(payload)
    console.log(citiesContract.address)


    // const execution = await myUniversalProfile.execute(0, citiesContract.address, currentPrice, payload)
    // console.log(execution)

    console.log('end');

    // web3.eth.estimateGas(transactionObject)
    //   .then(async (newGas: number) => {
    // const newTransactionObject = {
    //   from: fromAddress ? fromAddress : '',
    //   gas: newGas * 10,
    //   gasPrice: gasPrice,
    //   value: currentPrice ? currentPrice : '',
    // };

    // const citiesContract = getCityContract();
    // const tileLocator = `0x${tileId}`;

    // const payload = await citiesContract.methots.buyTile(tileLocator, upNewOwner).encodeABI();
    // const execution = UniversalProfile.execute(0, citiesContract.address, amount, payload)

    // citiesContract.methods.buyTile(tileLocator, upNewOwner).send(newTransactionObject, (error: any, result: any) => {
    //   if (error) {
    //     console.log('error');
    //     console.log(error);
    //   }
    //   if (result) {
    //     console.log('buy success');
    //     console.log(result);
    //   }
    //   return;
    // });



    // })
  } catch {
    return new Error('Error fetching buy tile');
  }
}
