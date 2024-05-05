import { ProcessSchema } from '@compyto/core';
import validation from '@compyto/validation';

const MonitoringContextSchema = validation
  .object()
  .shape({
    process: ProcessSchema,
  })
  .strict()
  .required();

export default MonitoringContextSchema;
