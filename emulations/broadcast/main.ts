import { createRunner } from '@compyto/runner';

export default async function start(settingsPath?: string) {
  const { communicator } = await createRunner(settingsPath);
  await communicator.start();
  const MASTER = 0;
  const data = [];

  if (communicator.isMaster) {
    data.push(1, 2, 3, 4, 5);
  }

  await communicator.broadcast(data, 0, 5, MASTER);

  await communicator.finalize();

  return data;
}
