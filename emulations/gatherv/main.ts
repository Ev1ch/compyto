import { createRunner } from '@compyto/runner';

export default async function start(settingsPath?: string) {
  const { communicator } = await createRunner(settingsPath);
  await communicator.start();
  const MASTER = 0;
  const data = [];
  if (communicator.process.rank === 0) {
    data.push(1);
  } else if (communicator.process.rank === 1) {
    data.push(2, 3, 4, 5);
  } else {
    data.push(6);
  }

  const counts = [1, 4, 1];
  const offsets = [0, 1, 5];
  const res = [];

  await communicator.gatherv(data, data.length, res, counts, offsets, MASTER);

  // await communicator.finalize();
  return res;
}
