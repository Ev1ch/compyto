/**
 * The scope which represents the area of
 * application which emitted an event.
 */
type MonitoringEventKeyScope =
  | 'balancing'
  | 'runner'
  | 'connections'
  | 'monitoring'
  | 'communications';

export default MonitoringEventKeyScope;
