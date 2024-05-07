import validation from '@compyto/validation';

import MonitoringData from './MonitoringDataSchema';

const MonitoringDatasSchema = validation
  .array()
  .of(MonitoringData)
  .strict()
  .required();

export default MonitoringDatasSchema;
