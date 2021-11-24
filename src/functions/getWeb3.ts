import Web3 from 'web3';

export default function GetWeb3(): Web3 {
    const web3 = new Web3(window.ethereum);
    return web3;
}
