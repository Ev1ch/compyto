import { createRunner } from '@/runner/logic';

export default async function start() {
  const { communicator } = await createRunner();
  await communicator.start();

  const data: number[] = [];

  if (communicator.isMaster) {
    const shareData = [1, 2, 3, 4, 5, 6];
    await communicator.scatter(shareData, 2, data, 2);
  }

  
  console.log('RESULT: ', data);
}
