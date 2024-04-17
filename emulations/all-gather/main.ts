import { createRunner } from '@compyto/runner';

export default async function start() {
  const { communicator } = await createRunner();
  await communicator.start();
  console.log('Started the app');
  const data = [
    communicator.process.rank * 10,
    communicator.process.rank * 100,
  ];
  const res = [];

  await communicator.allGather(data, 0, 2, res, 0, 2);

  console.log(`Received: `, res);
}
