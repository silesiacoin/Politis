import UniversalProfileContract from '@lukso/universalprofile-smart-contracts/artifacts/UniversalProfile.json';
import axios from 'axios';
import { contractAddress } from '../constants/chain';
import getCityContract from './getCityContract';
import GetKeyManager from './getKeyManager';
import { getSigner } from './getSigner';
import GetWeb3 from './getWeb3';

interface Props {
  currentPrice: number | null | undefined;
  fromAddress: string | null;
  // gasPrice: string;
  // gas: string;
  tileId: number | undefined;
  upNewOwner: string;
  upAddress: string | null;
}

export async function buyTile({ currentPrice, fromAddress, tileId, upNewOwner, upAddress }: Props): Promise<void | Error> {
  const web3 = GetWeb3();
  const keyManager = await GetKeyManager({
    upAddress: upNewOwner,
  });

  try {
    const citiesContract = getCityContract();
    const tileLocator = `0x${tileId}`;
    const myAbi: any = UniversalProfileContract.abi;

    const myUniversalProfile = new web3.eth.Contract(myAbi, upAddress ? upAddress : '');

    const citiesPayload = citiesContract.methods.buyTile(tileLocator, upNewOwner).encodeABI();

    if (!currentPrice) return;
    const abiPayload = await myUniversalProfile.methods
      .execute(0, contractAddress, web3.utils.toWei(currentPrice.toString()), citiesPayload)
      .encodeABI();

    const keyManagerAddress = await myUniversalProfile.methods.owner().call();

    // w doc jest tak:
    const controllerAccount = web3.eth.accounts.privateKeyToAccount(fromAddress ? fromAddress : '');
    const controllerAddress = controllerAccount.address;
    const nonce = await keyManager.methods.getNonce(controllerAddress, 0).call();

    // u nas jest tak:
    // fromAddress - adres publiczny z metamask
    // const nonce = await keyManager.methods.getNonce(fromAddress, 0).call();

    console.log(nonce)

    const message = await web3.utils.soliditySha3(keyManagerAddress, nonce, {
      t: 'bytes',
      v: abiPayload,
    });

    const signer = await getSigner();

    if (!signer || !message) return;
    const signature = await signer.signMessage(message);

    const payload = {
      keyManagerAddress,
      transaction: {
        abi: abiPayload,
        signature,
        nonce,
      },
    };

    const optionAxios = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'POST',
        // 'Access-Control-Allow-Headers': 'Content-Type',
        // 'Content-Type': 'application/json',
      },
      // mode: 'cors',
    };

    const response = await axios.post('https://relayer.lukso.network/api/v1/execute', payload, optionAxios);
    console.log(response);
    const { taskId } = response.data as any;
    console.log(taskId);

    // fetch('https://relayer.lukso.network/api/v1/execute', {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    //   },
    //   mode: 'no-cors', // no-cors, *cors, same-origin
    //   cache: 'no-cache',
    //   body: JSON.stringify(payload),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('My Success:', data);
    //   })
    //   .catch((error) => {
    //     console.error('My Error:', error);
    //   });

    const interval = setInterval(async () => {
      await axios
        .get('https://relayer.lukso.network/api/v1/task/030eca49-8fd3-41cb-9577-3f2d80abc782')
        .then((response) => {
          const responseData: any = response.data;
          console.log(responseData.success);
          if (responseData.success) clearInterval(interval);
        })
        .catch((error) => {
          console.error(error);
          clearInterval(interval);
        });
    }, 2000);
  } catch {
    return new Error('Error fetching buy tile');
  }
}
