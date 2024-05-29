import { createRunner } from '@compyto/runner';

export default async function start(settingsPath?: string) {
  const { communicator } = await createRunner(settingsPath);
  await communicator.start();
  const MASTER = 0;
  const TOTAL = 10;
  const data = new Array(TOTAL).fill(1);
  const res = [];

  await communicator.gather(data, TOTAL, res, TOTAL, MASTER);

  // console.log(`Received: `, res.length);

  await communicator.finalize();

  return res;
}
