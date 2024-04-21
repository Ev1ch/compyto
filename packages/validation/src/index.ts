import * as yup from 'yup';

import { ISO_DATE_REGEX } from './constants';

yup.addMethod(yup.Schema, 'notPresent', function (message) {
  return this.test('notPresent', message, function () {
    const { path, createError } = this;
    const parent = this.parent;

    if (parent && typeof parent === 'object' && path in parent) {
      return createError({
        path,
        message: message || `${path} must not be present`,
      });
    }

    return true;
  });
});

yup.addMethod(yup.StringSchema, 'iso', function (message) {
  return this.test('iso', message, function (value) {
    const { path, createError } = this;
    console.log(value);

    if (typeof value !== 'string' || !value.match(ISO_DATE_REGEX)) {
      return createError({
        path,
        message: message || `${path} must be an ISO 8601 date`,
      });
    }

    return true;
  });
});

declare module 'yup' {
  interface Schema {
    notPresent(message?: string): Schema;
  }

  interface StringSchema {
    iso(message?: string): StringSchema;
  }
}

export default yup;
