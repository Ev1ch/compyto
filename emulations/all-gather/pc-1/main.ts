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
  test('result must be length 6 on every process', () => {
    assert.equal(res.length, 6, 'Shoud be equal 0');
    assert.equal(res[0], 0);
    assert.equal(res[1], 0);
    assert.equal(res[2], 10);
    assert.equal(res[3], 20);
    assert.equal(res[4], 100);
    assert.equal(res[5], 200);
  });
}
