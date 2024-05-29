import { createRunner } from '@compyto/runner';

export default async function start(settingsPath?: string) {
  const { communicator } = await createRunner(settingsPath);
  await communicator.start();
  const MASTER = 0;
  const data = [1, 2, 3, 4, 5, 6];
  const buf = [];

  // 2 ==> FOR EACH PROCESS!
  await communicator.scatter(data, 2, buf, 2, MASTER);

  await communicator.finalize();

  return buf;
}
