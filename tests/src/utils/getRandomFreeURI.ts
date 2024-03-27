import type { URI } from '@compyto/connections';

import { LOCAL_HOST } from '../constants';
import getRandomFreePort from './getRandomFreePort';

export default async function getRandomFreeURI(
  ignoredPorts?: number[],
): Promise<URI> {
  let port = null;

  while (!port) {
    const randomPort = await getRandomFreePort();

    if (ignoredPorts?.includes(randomPort)) {
      continue;
    }

    port = randomPort;
  }

  return {
    path: LOCAL_HOST,
    port,
  };
}
