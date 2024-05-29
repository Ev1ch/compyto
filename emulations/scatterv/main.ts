import { createRunner } from '@compyto/runner';

export default async function start(settingsPath?: string) {
  const { communicator } = await createRunner(settingsPath);
  await communicator.start();
  const MASTER = 0;
  const data = [1, 2, 3, 4, 5, 6];
  const counts = [1, 4, 1];
  const offsets = [0, 1, 5];

  const receiveCount = counts[communicator.process.rank];
  const buf = [];

  await communicator.scatterv(data, counts, offsets, buf, receiveCount, MASTER);

  await communicator.finalize();

  return buf;
}
