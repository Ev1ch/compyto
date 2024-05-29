import { OPERATOR } from '@compyto/core';
import { createRunner } from '@compyto/runner';

export default async function start(settingsPath?: string) {
  const { communicator } = await createRunner(settingsPath);
  await communicator.start();
  const MASTER = 0;
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const buf = [];

  await communicator.reduce(data, 0, buf, 10, OPERATOR.SUM, MASTER);

  // await communicator.finalize();
  return buf;
}
