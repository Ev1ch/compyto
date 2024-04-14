import {
  getMonitoringEventKeyParts,
  SCOPE_DELIMITER,
  TYPE_DELIMITER,
  type MonitoringEventKeys,
} from '@compyto/monitoring';

import {
  COLOR_TO_PRINT_METHOD_MAP,
  EVENT_SCOPE_TO_COLOR_MAP,
  TYPE_TO_COLOR_MAP,
} from '../constants';

export default function getColoredMonitoringEventKey<
  TMonitoringEventKey extends MonitoringEventKeys,
>(eventKey: TMonitoringEventKey) {
  const [type, scope, name] = getMonitoringEventKeyParts(eventKey);

  const typeColor = TYPE_TO_COLOR_MAP[type];
  const scopeColor = EVENT_SCOPE_TO_COLOR_MAP[scope];
  const getTypeColored = COLOR_TO_PRINT_METHOD_MAP[typeColor];
  const getScopeColored = COLOR_TO_PRINT_METHOD_MAP[scopeColor];

  const coloredType = getTypeColored(`${type}${TYPE_DELIMITER}`);
  const coloredScope = getScopeColored(`${scope}${SCOPE_DELIMITER}${name}`);

  return `${coloredType}${coloredScope}`;
}
