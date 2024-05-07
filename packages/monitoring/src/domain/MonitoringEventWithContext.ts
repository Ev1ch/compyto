import type MonitoringContext from './MonitoringContext';
import type MonitoringEvent from './MonitoringEvent';

export default interface MonitoringEventWithContext {
  context: MonitoringContext;
  event: MonitoringEvent;
}
