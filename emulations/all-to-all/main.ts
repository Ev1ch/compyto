import { createRunner } from '@compyto/runner';

export default async function start(settingsPath?: string) {
  const { communicator } = await createRunner(settingsPath);
  await communicator.start();
  const rank = communicator.process.rank;
  const size = 3;
  const data = [];
  for (let i = 0; i < size; i++) {
    data[i] = rank * size + i; // Example data: process 0: 0, 1, 2, ..., size-1; process 1: size, size+1, ..., 2*size-1; and so on
  }
  const buf = [];

  // 1 to each process
  await communicator.allToAll(data, 0, 1, buf, 0, 1);

  // await communicator.finalize();
  return buf;
}
