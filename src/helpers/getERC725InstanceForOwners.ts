import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';

export default function getERC725InstanceForOwners(
  address: string
): any {
  const schema: ERC725JSONSchema[] = [
    {
      name: 'LSP3Profile',
      key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
      keyType: 'Singleton',
      valueContent: 'JSONURL',
      valueType: 'bytes',
    }
  ];
  const provider = window.ethereum;
  const config = { ipfsGateway: 'https://ipfs.lukso.network/ipfs/' };
  return new ERC725(schema, address, provider, config);
}
