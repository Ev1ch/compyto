import type { URI } from '@/connections/domain';

import getRandomPath from './getRandomPath';
import getRandomPort from './getRandomPort';

export default function getRandomURI(): URI {
  return {
    path: getRandomPath(),
    port: getRandomPort(),
  };
}
