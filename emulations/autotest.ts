import * as path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

// @ts-expect-error import
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// tsx autotest.ts <process code>
const code = process.argv.slice(2)[0];
if (!code) throw new Error('Provide code');

test('Autotest for each method', async (t) => {
  await t.test('One to many methods', async (t) => {
    await t.test('Broadcast', async () => {
      const mainFilePath = path.resolve(__dirname, `broadcast/${code}/main.ts`);

      const module = await import(mainFilePath);
      if (typeof module.default !== 'function') {
        throw new Error(`No start function found in ${mainFilePath}`);
      }

      await module.default();
    });

    await t.test('Scatter', async () => {
      const mainFilePath = path.resolve(__dirname, `scatter/${code}/main.ts`);

      const module = await import(mainFilePath);
      if (typeof module.default !== 'function') {
        throw new Error(`No start function found in ${mainFilePath}`);
      }

      await module.default();
    });
  });

  await t.test('Many to one methods', async (t) => {
    await t.test('Gather', async () => {
      const mainFilePath = path.resolve(__dirname, `gather/${code}/main.ts`);

      const module = await import(mainFilePath);
      if (typeof module.default !== 'function') {
        throw new Error(`No start function found in ${mainFilePath}`);
      }

      await module.default();
    });
  });
});
