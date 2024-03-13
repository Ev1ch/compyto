import validation from '@/validation';

const URISchema = validation
  .object()
  .shape({
    path: validation.string().required().strict(),
    port: validation.number().integer().required().strict(),
  })
  .strict();

export default URISchema;
