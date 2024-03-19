import type { Communicator } from '@/connections/domain';

import type Settings from './Settings';

/**
 * Core runtime abstraction which
 * helps to read the settings and
 * create the {@link packages/connections/domain/Communicator.Communicator | communicator}
 * based on them.
 */
export default interface Runner {
  readonly settings: Settings;
  readonly communicator: Communicator;
}
