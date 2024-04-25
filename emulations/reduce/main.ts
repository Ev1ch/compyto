import { OPERATOR } from '@compyto/core';
import { createRunner } from '@compyto/runner';

export default async function start() {
  const { communicator } = await createRunner();
  await communicator.start();
  const MASTER = 0;
  console.log('Started the app');
  const data = [
    { rank: communicator.process.rank, value: communicator.process.rank },
  ];
  console.log('Starting data: ', data);

  const buf = [];

  await communicator.reduce(data, buf, 1, OPERATOR.MINLOC, MASTER);

  console.log(
    `Received by ${communicator.process.code} (${communicator.process.rank}): `,
    buf,
  );

  // await communicator.finalize();
}
