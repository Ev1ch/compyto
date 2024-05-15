export const TYPE_DELIMITER = ':';

export const SCOPE_DELIMITER = '/';

export const ANY_MONITORING_EVENT_KEY = 'ANY_MONITORING_EVENT_KEY';

export const MONITORING_EVENT_TYPES = ['info', 'error', 'warning'] as const;

export const MONITORING_EVENT_SCOPES = [
  'balancing',
  'runner',
  'connections',
  'monitoring',
  'communications',
] as const;

export const MONITORING_EVENT_KEY_REGEX =
  /(info|error|warning):(balancing|runner|connections|monitoring|communications)\/.{1,}/;
