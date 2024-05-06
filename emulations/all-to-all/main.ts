import { createRunner } from '@compyto/runner';

export default async function start() {
  const { communicator } = await createRunner();
  await communicator.start();
  const rank = communicator.process.rank;
  const size = 3;
  console.log('Started the app');
  const data = [];
  for (let i = 0; i < size; i++) {
    data[i] = rank * size + i; // Example data: process 0: 0, 1, 2, ..., size-1; process 1: size, size+1, ..., 2*size-1; and so on
  }
  console.log('Starting data: ', data);
  const buf = [];

  await communicator.allToAll(data, 0, 1, buf, 0, 1);

  console.log(
    `Received by ${communicator.process.code} (${communicator.process.rank}): `,
    buf,
  );

  // await communicator.finalize();
}
