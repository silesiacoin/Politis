import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';

export default function getERC725Instance(
  address: string,
  subMetamaskAddress: string | undefined
): any {
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
      name: `AddressPermissions:Permissions:${subMetamaskAddress}`,
      key: `0x4b80742d0000000082ac0000${subMetamaskAddress}`,
      keyType: 'Bytes20MappingWithGrouping',
      valueContent: 'Keccak256',
      valueType: 'bytes32',
    },
  ];
  const provider = window.ethereum;
  const config = { ipfsGateway: 'https://ipfs.lukso.network/ipfs/' };
  return new ERC725(schema, address, provider, config);
}
