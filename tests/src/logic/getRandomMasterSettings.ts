import type { MasterSettings } from '@compyto/settings';

import { getRandomClient, getRandomCode, getRandomFreeURI } from '../utils';

export default async function getRandomMasterSettings(
  clients: number,
): Promise<MasterSettings> {
  return {
    isMaster: true,
    uri: await getRandomFreeURI(),
    monitoring: {
      uri: await getRandomFreeURI(),
    },
    code: getRandomCode(),
    clients: Array.from({ length: clients }, getRandomClient),
  };
}
