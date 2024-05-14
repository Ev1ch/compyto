import { createRunner } from '@compyto/runner';

export default async function start() {
  const { communicator } = await createRunner();
  await communicator.start();
  const MASTER = 0;
  console.log('Started the app');
  const data = [];
  if (communicator.process.rank === 0) {
    data.push(1);
  } else if (communicator.process.rank === 1) {
    data.push(2, 3, 4, 5);
  } else {
    data.push(6);
  }
  console.log(`Starting data: `, data);

  const counts = [1, 4, 1];
  const offsets = [0, 1, 5];
  const res = [];

  await communicator.gatherv(data, data.length, res, counts, offsets, MASTER);

  console.log(`Received: `, res);
  await communicator.finalize();
}
