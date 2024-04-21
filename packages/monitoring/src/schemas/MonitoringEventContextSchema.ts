import validation from '@compyto/validation';

const MonitoringEventContextSchema = validation
  .object()
  .shape({
    id: validation.string().strict().required(),
    emittedAt: validation.string().strict().iso().required(),
  })
  .strict()
  .required();

export default MonitoringEventContextSchema;
