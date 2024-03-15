import type { URI } from '@/connections/domain';
import type { Code, Process } from '@/core/domain';
import type { Xor } from '@/utils/domain';

/**
 * Represents the settings
 * which are used to configure
 * the {@link packages/connections/domain/Communicator.Communicator  | communicators}
 */
type Settings = {
  code: Code;
  uri: URI;
} & Xor<
  { isMaster: true; clients: Process[] },
  {
    isMaster?: false;
    master: {
      uri: URI;
    };
  }
>;

export default Settings;
