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
  test('result must be 30 number === 1', () => {
    assert.equal(res.length, 30, 'Shoud be equal 30');
    assert.equal(
      res.reduce((prev, curr) => prev + curr, 0),
      30,
    );
  });
}
