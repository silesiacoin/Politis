import { getAdminSchema } from '../constants/erc725schemas';
import getERC725Instance from './getERC725Instance';

export default async function fetchAdminProfile(address: string): Promise<any> {
  const schema = getAdminSchema();
  const erc725 = getERC725Instance(address, schema);
  try {
    return await erc725.getData();
  } catch (error) {
    return console.error(error);
  }
}
