import type { URI } from '@compyto/connections';
import type { Code } from '@compyto/core';

import { getRandomFreeURI } from '../utils';

export default async function getClientSettings(masterURI: URI, code: Code) {
  return {
    uri: await getRandomFreeURI([masterURI.port]),
    code,
    master: {
      uri: masterURI,
    },
  };
}
