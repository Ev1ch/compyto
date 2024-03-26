import type { URI } from '@compyto/connections';
import type { Code, Process } from '@compyto/core';
import type { Xor } from '@compyto/utils';

/**
 * Represents the settings
 * which are used to configure
 * the {@link connections/src.Communicator  | communicators}.
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
