import { createRunner } from '@compyto/runner';

export default async function start(settingsPath?: string) {
  const { communicator } = await createRunner(settingsPath);
  await communicator.start();
  const data = [
    communicator.process.rank * 10,
    communicator.process.rank * 100,
  ];
  const res = [];

  await communicator.allGather(data, 0, 2, res, 0, 2);

  // await communicator.finalize();

  return res.sort((a, b) => a - b);
}
