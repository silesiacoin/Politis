import getERC725Instance from './getERC725Instance';
import { getAssetSchema } from '../constants/erc725schemas';
import { LSP3ProfileJSON } from '@lukso/lsp-factory.js';

export default async function fetchAssetData(address: string): Promise<LSP3ProfileJSON[]> {
  const erc725 = getERC725Instance(address, getAssetSchema());
  const data = erc725.getData();
  return data;
}
