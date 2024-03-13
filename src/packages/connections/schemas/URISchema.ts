import * as yup from 'yup';

const URISchema = yup
  .object()
  .shape({
    path: yup.string().required().strict(),
    code: yup.number().integer().required().strict(),
  })
  .strict();

export default URISchema;
