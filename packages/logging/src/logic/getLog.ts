import type { UnknownArgs } from '@compyto/core/domain';

import getColoredTimestamp from './getColoredTimestamp';

/**
 * Method which provide the basic log structure,
 * which include the colored timestamp and some unknown data.
 */
export default function getLog(...args: UnknownArgs) {
  return [getColoredTimestamp(), ...args];
}
