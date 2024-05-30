import type { URI } from '@compyto/connections';
import type { Code, Rank } from '@compyto/core';
import type { ClientSettings } from '@compyto/settings';

import { getRandomFreeURI } from '../utils';

export default async function getClientSettings(
  masterURI: URI,
  code: Code,
  rank: Rank,
): Promise<ClientSettings> {
  return {
    uri: await getRandomFreeURI([masterURI.port]),
    rank,
    monitoring: {
      isEnabled: true,
    },
    code,
    master: {
      uri: masterURI,
    },
  };
}
