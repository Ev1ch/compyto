import validation from '@compyto/validation';

import MonitoringEventSchema from './MonitoringEventSchema';

const MonitoringEventsSchema = validation
  .array()
  .of(MonitoringEventSchema)
  .strict()
  .required();

export default MonitoringEventsSchema;
