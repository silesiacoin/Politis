import Web3 from 'web3';
import { citiesAbi } from '../constants/abi';

export default function getCityContract(): any {
  const contractAddress = '0xD38CfFCe6B3eFbB87C33Fc75aBA0df351fd1B5e3';
  const web3 = new Web3(window.ethereum);
  const myAbi: any = citiesAbi;

  const contract = new web3.eth.Contract(myAbi, contractAddress);
  return contract;
}
