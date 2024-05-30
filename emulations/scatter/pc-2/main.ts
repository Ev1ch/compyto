import * as assert from 'assert';
import test from 'node:test';
import * as path from 'path';
import { fileURLToPath } from 'url';

import start from '../main';

export default async function () {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const settings = path.resolve(__dirname, 'settings.json');

  const res = await start(settings);
  test('result must be 2 numbers', () => {
    assert.equal(res.length, 2, 'Shoud be equal 2');
    assert.equal(res[0], 5);
    assert.equal(res[1], 6);
  });
}
