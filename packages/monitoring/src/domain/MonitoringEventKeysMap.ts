import type { Balance } from '@compyto/balancing';
import type { Device } from '@compyto/connections';
import type { Process } from '@compyto/core';

/**
 * The map which matches the full event
 * and its args type. The event must match
 * the {@link monitoring/src.MonitoringEventKey | format}.
 */
type MonitoringEventKeysMap = {
  'info:connections/communicator-creation-started': [];
  'info:connections/communicator-creation-finished': [];
  'info:connections/main-person-identification-sent': [];
  'info:connections/main-person-balances-sent': [Balance[]];
  'info:connections/main-person-confirmation-received': [Device];
  'info:connections/main-person-got-client': [Device];
  'info:connections/main-person-started': [];
  'info:connections/person-identification-received': [Device];
  'info:connections/person-balances-received': [Balance[]];
  'info:connections/person-as-client-connected': [Device];
  'info:connections/person-as-client-connecting-started': [];
  'info:connections/person-as-server-got-client': [Device];
  'info:connections/person-as-server-identification-sent': [Device];
  'info:connections/person-started': [];
  'info:connections/communication-handlers-set': [];
  'info:connections/connected-as-client-to-all-balanced-servers': [];
  'info:connections/got-all-clients-as-balanced-server': [];
  'info:connections/sent': [unknown, Process];
};

export default MonitoringEventKeysMap;
