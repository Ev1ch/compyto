import type { Balance } from '@compyto/balancing';
import type { Data, Device } from '@compyto/connections';
import { OperatorType, Rank } from '@compyto/core';

import MonitoringContext from './MonitoringContext';

/**
 * The map which matches the full event
 * and its args type. The event must match
 * the {@link monitoring/src.MonitoringEventKey | format}.
 */
type MonitoringEventKeysMap = {
  'info:monitoring/context-set': [MonitoringContext];

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

  'info:communications/gather-started': [];
  'info:communications/gather-finished': [];
  'info:communications/gatherv-started': [];
  'info:communications/gatherv-finished': [];
  'info:communications/all-gather-started': [];
  'info:communications/all-gather-finished': [];
  'info:communications/sent-data': [Data, Rank];
  'info:communications/received-data': [Data, Rank];
  'info:communications/finalize': [Rank];
  'info:communications/broadcast-started': [Data[], Rank];
  'info:communications/broadcast-finished': [];
  'info:communications/scatter-started-main': [Data[][], Rank];
  'info:communications/scatter-started-person': [Rank];
  'info:communications/scatter-finished': [Rank];
  'info:communications/scatterv-started': [Data[], number[], number[], Rank];
  'info:communications/scatterv-finished': [Rank];
  'info:communications/reduce-started': [OperatorType, Rank];
  'info:communications/reduce-all-data-receive': [Data[]];
  'info:communications/reduce-calculated': [Data];
  'info:communications/reduce-finished': [OperatorType, Rank];
  'info:communications/all-reduce-started': [OperatorType];
  'info:communications/all-reduce-all-data-receive': [Data[]];
  'info:communications/all-reduce-calculated': [Data];
  'info:communications/all-reduce-finished': [OperatorType];
  'info:communications/all-to-all-started': [Data[]];
  'info:communications/all-to-all-finished': [];
};

export default MonitoringEventKeysMap;
