import validation from '@compyto/validation';

import MonitoringContextSchema from './MonitoringContextSchema';
import MonitoringEventsSchema from './MonitoringEventsSchema';

const MonitoringData = validation
  .object()
  .shape({
    events: MonitoringEventsSchema,
    context: MonitoringContextSchema,
  })
  .strict()
  .required();

export default MonitoringData;
