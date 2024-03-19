import validation from '@/validation';

/**
 * {@link packages/core/domain/Code.Code | Code} validation schema.
 */
const CodeSchema = validation.string().required().strict();

export default CodeSchema;
