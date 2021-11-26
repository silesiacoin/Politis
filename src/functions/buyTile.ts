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

    const nonce = await keyManager.methods.getNonce(fromAddress, 0).call();

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

    const response = await axios.post('https://relayer.lukso.network/api/v1/execute', payload);
    console.log(response);
    const { taskId } = response.data as any;
    console.log(taskId);
    // const interval = setInterval(async () => {
    //   await axios
    //     .get(`https://relayer.lukso.network/api/v1/task/${taskId}`)
    //     .then(({ status, data }) => {
    //       console.log(status, data);
    //       if (status) clearInterval(interval);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       clearInterval(interval);
    //     });
    // }, 2000);
  } catch {
    return new Error('Error fetching buy tile');
  }
}
