import validation from '@/validation';

import CodeSchema from './CodeSchema';

const ProcessSchema = validation
  .object()
  .shape({
    code: CodeSchema,
  })
  .strict();

export default ProcessSchema;
