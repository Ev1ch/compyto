import * as yup from 'yup';

const ProcessSchema = yup
  .object()
  .shape({
    code: yup.string().required().strict(),
  })
  .strict();

export default ProcessSchema;
