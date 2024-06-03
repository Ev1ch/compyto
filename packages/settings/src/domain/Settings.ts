import type { URI } from '@compyto/connections';
import type { Code, Process, Rank } from '@compyto/core';
import type { Xor } from '@compyto/utils';

export interface MonitoringSettings {
  isEnabled?: boolean;
  filename: string;
}

export interface DashboardSettings {
  uri: URI;
}

export interface BaseSettings {
  rank: Rank;
  code: Code;
  uri: URI;
  monitoring?: MonitoringSettings;
  dashboard?: DashboardSettings;
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
