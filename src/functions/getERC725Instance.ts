import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';

export default function getERC725Instance(address: string, schema: ERC725JSONSchema[]): any {
  const provider = window.ethereum;
  const config = { ipfsGateway: 'https://ipfs.lukso.network/ipfs/' };
  return new ERC725(schema, address, provider, config);
}
