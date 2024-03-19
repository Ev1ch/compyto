import validation from '@/validation';

/**
 * {@link packages/connections/domain/URI.URI | URI} validation schema.
 */
const URISchema = validation
  .object()
  .shape({
    path: validation.string().required().strict(),
    port: validation.number().integer().required().strict(),
  })
  .strict();

export default URISchema;
