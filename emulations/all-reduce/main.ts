import { OPERATOR } from '@compyto/core';
import { createRunner } from '@compyto/runner';

export default async function start(settingsPath?: string) {
  const { communicator } = await createRunner(settingsPath);
  await communicator.start();
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const buf = [];

  await communicator.allReduce(data, 0, buf, 10, OPERATOR.SUM);

  // await communicator.finalize();
  return buf;
}
