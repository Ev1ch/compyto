import { OPERATOR } from '@compyto/core';
import { createRunner } from '@compyto/runner';

export default async function start() {
  const { communicator } = await createRunner();
  await communicator.start();
  console.log('Started the app');
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log('Starting data: ', data);

  const buf = [];

  await communicator.allReduce(data, 2, buf, 5, OPERATOR.SUM);

  console.log(
    `Received by ${communicator.process.code} (${communicator.process.rank}): `,
    buf,
  );

  await communicator.finalize();
}
