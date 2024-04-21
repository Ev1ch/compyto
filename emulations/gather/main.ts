import { createRunner } from '@compyto/runner';

import assert = require('assert');

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

  await communicator.gather(data, 0, 2, res, 0, 2, MASTER);

  console.log(`Received: `, res);

  await communicator.finalize();
  if (communicator.isMaster) {
    assert.equal(res.length, 6);
  }
}
