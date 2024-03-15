import { getRandomURI } from 'tests/utils';

import getStringURI from './getStringURI';

test('should build correct URI', () => {
  const uri = getRandomURI();
  const stringURI = `${uri.path}:${uri.port}`;

  const result = getStringURI(uri);

  expect(result).toBe(stringURI);
});
