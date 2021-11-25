import { citiesAbi } from '../constants/abi';
import { contractAddress } from '../constants/chain';
import GetWeb3 from './getWeb3';

export default function getCityContract(): any {
  const web3 = GetWeb3();
  const myAbi: any = citiesAbi;

  const contract = new web3.eth.Contract(myAbi, contractAddress);
  return contract;
}
