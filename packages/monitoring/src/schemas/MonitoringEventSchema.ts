import validation from '@compyto/validation';

import MonitoringEventContextSchema from './MonitoringEventContextSchema';

const MonitoringEventSchema = validation
  .object()
  .shape({
    key: validation.string().strict().required(),
    args: validation.array().strict().required(),
    context: MonitoringEventContextSchema.required(),
  })
  .strict()
  .required();

export default MonitoringEventSchema;
