import type { MasterSettings } from '@compyto/settings';

import { getRandomClient, getRandomCode, getRandomFreeURI } from '../utils';

export default async function getRandomMasterSettings(
  clients: number,
): Promise<MasterSettings> {
  return {
    isMaster: true,
    rank: 0,
    uri: await getRandomFreeURI(),
    monitoring: {
      isEnabled: true,
    },
    code: getRandomCode(),
    clients: Array.from({ length: clients }, () => getRandomClient(0)),
  };
}
