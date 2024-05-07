import validation from '@compyto/validation';

import CodeSchema from './CodeSchema';

/**
 * {@link core/src.Process | Process} validation schema.
 */
const ProcessSchema = validation
  .object()
  .shape({
    code: CodeSchema,
  })
  .strict()
  .required();

export default ProcessSchema;
