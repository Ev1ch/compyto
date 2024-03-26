import validation from '@compyto/validation';

import CodeSchema from './CodeSchema';

/**
 * {@link packages/core/domain/Process.Process | Process} validation schema.
 */
const ProcessSchema = validation
  .object()
  .shape({
    code: CodeSchema,
  })
  .strict();

export default ProcessSchema;
