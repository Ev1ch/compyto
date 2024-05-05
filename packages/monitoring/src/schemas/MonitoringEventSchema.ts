import validation from '@compyto/validation';

import { MONITORING_EVENT_KEY_REGEX } from '../constants';
import MonitoringEventContextSchema from './MonitoringEventContextSchema';

const MonitoringEventSchema = validation
  .object()
  .shape({
    key: validation
      .string()
      .matches(MONITORING_EVENT_KEY_REGEX)
      .strict()
      .required(),
    args: validation.array().strict().required(),
    context: MonitoringEventContextSchema.required(),
  })
  .strict()
  .required();

export default MonitoringEventSchema;
