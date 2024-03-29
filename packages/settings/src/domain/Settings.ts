import type { URI } from '@compyto/connections';
import type { Code, Process } from '@compyto/core';
import type { Xor } from '@compyto/utils';

interface BaseSettings {
  code: Code;
  uri: URI;
  monitoring: {
    uri: URI;
  };
}

export interface ClientSettings extends BaseSettings {
  isMaster?: false;
  master: {
    uri: URI;
  };
}

export interface MasterSettings extends BaseSettings {
  isMaster: true;
  clients: Process[];
}

/**
 * Represents the settings
 * which are used to configure
 * the {@link connections/src.Communicator  | communicators}.
 */
type Settings = Xor<ClientSettings, MasterSettings>;

export default Settings;
