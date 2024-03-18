import type { UnknownArgs } from '@/core/domain';

import getColoredTimestamp from './getColoredTimestamp';

export default function getLog(...args: UnknownArgs) {
  return [getColoredTimestamp(), ...args];
}
