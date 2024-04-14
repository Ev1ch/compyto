import type { URI } from '@compyto/connections';
import type { Code } from '@compyto/core';
import type { ClientSettings } from '@compyto/settings';

import { getRandomFreeURI } from '../utils';

export default async function getClientSettings(
  masterURI: URI,
  code: Code,
): Promise<ClientSettings> {
  return {
    uri: await getRandomFreeURI([masterURI.port]),
    monitoring: {
      uri: await getRandomFreeURI(),
    },
    code,
    master: {
      uri: masterURI,
    },
  };
}
