import { ERC725JSONSchema } from '@erc725/erc725.js';

export const getBasicSchema = (subMetamaskAddress: string): ERC725JSONSchema[] => [
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

export const getAssetSchema = (): ERC725JSONSchema[] => [
  {
    name: 'LSP4TokenName',
    key: '0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1',
    keyType: 'Singleton',
    valueContent: 'String',
    valueType: 'string',
  },
  {
    name: 'LSP4TokenSymbol',
    key: '0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756',
    keyType: 'Singleton',
    valueContent: 'String',
    valueType: 'string',
  },
];
