import { createRunner } from '@compyto/runner';

export default async function start() {
  const { communicator } = await createRunner();
  await communicator.start();
  const MASTER = 0;
  console.log('Started the app');
  const TOTAL = 100000;
  const data = new Array(TOTAL).fill(1);
  const res = [];

  await communicator.gather(data, TOTAL, res, TOTAL, MASTER);

  console.log(`Received: `, res.length);

  await communicator.finalize();
}
