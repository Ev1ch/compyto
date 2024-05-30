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
  test('result must be length 10 and operator SUM must be applied', () => {
    assert.equal(res.length, 10, 'Shoud be equal 10');
    assert.equal(res[0], 3);
    assert.equal(res[1], 6);
    assert.equal(res[2], 9);
    assert.equal(res[3], 12);
    assert.equal(res[4], 15);
    assert.equal(res[5], 18);
    assert.equal(res[6], 21);
    assert.equal(res[7], 24);
    assert.equal(res[8], 27);
    assert.equal(res[9], 30);
  });
}
