import type { URI } from '@compyto/connections';

import getRandomPath from './getRandomPath';
import getRandomPort from './getRandomPort';

export default function getRandomURI(): URI {
  return {
    path: getRandomPath(),
    port: getRandomPort(),
  };
}
