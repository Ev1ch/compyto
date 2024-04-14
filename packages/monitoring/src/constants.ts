export const TYPE_DELIMITER = ':';

export const SCOPE_DELIMITER = '/';

export const ANY_MONITORING_EVENT_KEY = 'ANY_MONITORING_EVENT_KEY';

export const MONITORING_EVENT_TYPES = ['info', 'error', 'warning'] as const;

export const MONITORING_EVENT_SCOPE = [
  'balancing',
  'runner',
  'connections',
] as const;
