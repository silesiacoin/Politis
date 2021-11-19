import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';

export default function getERC725Instance(address: string): any {
  const schema: ERC725JSONSchema[] = [
    {
      name: 'SupportedStandards:ERC725Account',
      key: '0xeafec4d89fa9619884b6b89135626455000000000000000000000000afdeb5d6',
      keyType: 'Mapping',
      valueContent: '0xafdeb5d6',
      valueType: 'bytes',
    },
    {
      name: 'LSP3Profile',
      key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
      keyType: 'Singleton',
      valueContent: 'JSONURL',
      valueType: 'bytes',
    },
    {
      name: 'LSP1UniversalReceiverDelegate',
      key: '0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47',
      keyType: 'Singleton',
      valueContent: 'Address',
      valueType: 'address',
    },
    {
      name: 'AddressPermissions[]',
      key: '0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3',
      keyType: 'Array',
      valueContent: 'Address',
      valueType: 'address',
    },
  ];
  const provider = window.ethereum;
  const config = { ipfsGateway: 'https://ipfs.lukso.network/ipfs/' };
  return new ERC725(schema, address, provider, config);
}
