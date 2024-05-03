import { OPERATOR } from '@compyto/core';
import { createRunner } from '@compyto/runner';

export default async function start() {
  const { communicator } = await createRunner();
  await communicator.start();
  const MASTER = 0;
  console.log('Started the app');
  const data = [1, 2, 3];
  console.log('Starting data: ', data);

  const buf = [];

  await communicator.reduce(data, buf, 4, OPERATOR.SUM, MASTER);

  console.log(
    `Received by ${communicator.process.code} (${communicator.process.rank}): `,
    buf,
  );

  // await communicator.finalize();
}
