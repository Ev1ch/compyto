import * as yup from 'yup';

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

export default yup;
