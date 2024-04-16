import { createRunner } from '@compyto/runner';

export default async function start() {
  const { communicator } = await createRunner();
  await communicator.start();
  const MASTER = 0;
  console.log('Started the app');
  const data = [
    communicator.process.rank * 10,
    communicator.process.rank * 100,
  ];
  const res = [];

  await communicator.gather(data, 1, 2, res, 0, 1, MASTER);

  console.log(`Received: `, res);
}
