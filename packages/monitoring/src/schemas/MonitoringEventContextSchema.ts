import validation from '@compyto/validation';

const MonitoringEventContextSchema = validation
  .object()
  .shape({
    id: validation.string().strict().required(),
    emittedAt: validation.number().strict().required(),
  })
  .strict()
  .required();

export default MonitoringEventContextSchema;
