import validation from '@compyto/validation';

/**
 * {@link core/src.Code | Code} validation schema.
 */
const CodeSchema = validation.string().required().strict();

export default CodeSchema;
