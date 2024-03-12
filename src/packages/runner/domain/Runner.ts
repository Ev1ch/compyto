import type { Communicator } from '@/connections/domain';

import type Settings from './Settings';

export default interface Runner {
  settings: Settings;
  communicator: Communicator;
}
