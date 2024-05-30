import * as path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

// @ts-expect-error import
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// tsx autotest.ts <process code>
const code = process.argv.slice(2)[0];
if (!code) throw new Error('Provide code');

const testMethod = async (method: string) => {
  const mainFilePath = path.resolve(__dirname, `${method}/${code}/main.ts`);

  const module = await import(mainFilePath);
  if (typeof module.default !== 'function') {
    throw new Error(`No start function found in ${mainFilePath}`);
  }

  await module.default();
};

test('Autotest for each method', async (t) => {
  await t.test('One to one methods', async (t) => {
    await t.test('Send + Receive', async () => testMethod('send-receive'));
  });

  await t.test('One to many methods', async (t) => {
    const methods = ['broadcast', 'scatter', 'scatterv'];
    for (const method of methods) {
      await t.test(method, async () => testMethod(method));
    }
  });

  await t.test('Many to one methods', async (t) => {
    const methods = ['gather', 'gatherv', 'reduce'];
    for (const method of methods) {
      await t.test(method, async () => testMethod(method));
    }
  });

  await t.test('Many to many methods', async (t) => {
    const methods = ['all-gather', 'all-reduce', 'all-to-all'];
    for (const method of methods) {
      await t.test(method, async () => testMethod(method));
    }
  });
});
