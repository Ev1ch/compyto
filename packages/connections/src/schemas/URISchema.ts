import validation from '@compyto/validation';

/**
 * {@link connections/src.URI | URI} validation schema.
 */
const URISchema = validation
  .object()
  .shape({
    path: validation.string().required().strict(),
    port: validation.number().integer().required().strict(),
  })
  .strict();

export default URISchema;
