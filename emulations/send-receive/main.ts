import { createRunner } from '@compyto/runner';

export default async function start(settingsPath?: string) {
  const { communicator } = await createRunner(settingsPath);
  await communicator.start();
  const data1: number[] = [];
  const data2: number[] = [];
  for (const process of communicator.group.processes) {
    communicator.send(communicator.process.rank, process);
  }

  await communicator.receive(data1);
  await communicator.receive(data2);

  // await communicator.finalize();

  return [data1[0], data2[0]].sort((a, b) => a - b);
}
