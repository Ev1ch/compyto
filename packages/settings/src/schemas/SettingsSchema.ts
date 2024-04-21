import { URISchema, type URI } from '@compyto/connections';
import { CodeSchema, ProcessSchema } from '@compyto/core';
import validation from '@compyto/validation';

/**
 * {@link settings/src.Settings | Settings} validation schema.
 */
const SettingsSchema = validation
  .object()
  .shape({
    code: CodeSchema,
    uri: URISchema,
    monitoring: validation
      .object()
      .shape({ uri: URISchema })
      .strict()
      .when('dashboard', {
        is: (value?: { uri: URI }) => value !== undefined,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema,
      }),
    dashboard: validation.object().shape({ uri: URISchema }),
    isMaster: validation.boolean(),
    master: validation
      .object()
      .shape({
        uri: URISchema,
      })
      .strict()
      .when('isMaster', {
        is: (value?: boolean) => value === false || value === undefined,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notPresent(),
      }),
    clients: validation
      .array()
      .strict()
      .of(ProcessSchema)
      .min(1)
      .when('isMaster', {
        is: true,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notPresent(),
      }),
  })
  .strict();

export default SettingsSchema;
