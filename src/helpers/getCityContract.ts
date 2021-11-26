import { citiesAbi } from '../constants/abi';
import { contractAddress } from '../constants/chain';
import { getWeb3 } from './getWeb3';

export function getCityContract(): any {
  const web3 = getWeb3();
  const myAbi: any = citiesAbi;

  const contract = new web3.eth.Contract(myAbi, contractAddress);
  return contract;
}
