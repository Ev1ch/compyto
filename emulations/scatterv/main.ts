import { createRunner } from '@compyto/runner';

export default async function start() {
  const { communicator } = await createRunner();
  await communicator.start();
  const MASTER = 0;
  console.log('Started the app');
  const data = [1, 2, 3, 4, 5, 6];
  console.log('Starting data: ', data);
  const counts = [1, 4, 1];
  const offsets = [0, 1, 5];

  const receiveCount = counts[communicator.process.rank];
  const buf = [];

  await communicator.scatterv(data, counts, offsets, buf, receiveCount, MASTER);

  console.log(
    `Received by ${communicator.process.code} (${communicator.process.rank}): `,
    buf,
  );

  await communicator.finalize();
}
