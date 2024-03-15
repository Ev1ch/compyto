import { getRandomFreeURI } from 'tests/utils';

import type { URI } from '@/connections/domain';
import type { Code } from '@/core/domain';

export default async function getClientSettings(masterURI: URI, code: Code) {
  return {
    uri: await getRandomFreeURI([masterURI.port]),
    code,
    master: {
      uri: masterURI,
    },
  };
}
