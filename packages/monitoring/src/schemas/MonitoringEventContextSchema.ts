import validation from '@compyto/validation';

const MonitoringEventContextSchema = validation
  .object()
  .shape({
    id: validation.string().strict().required(),
    emittedAt: validation.date().strict().required(),
  })
  .strict()
  .required();

export default MonitoringEventContextSchema;
