import { createRunner } from '@compyto/runner';

import assert = require('assert');

export default async function start() {
  const { communicator } = await createRunner();
  await communicator.start();
  const MASTER = 0;
  console.log('Started the app');
  const data = [];

  if (communicator.isMaster) {
    data.push(1, 2, 3, 4, 5);
  }
  console.log('Start', data);

  await communicator.broadcast(data, 1, 3, MASTER);

  console.log('Result', data);
  // await communicator.finalize();

  assert.equal(data.length, 3);
  assert.equal(data[0], 2);
  assert.equal(data[1], 3);
  assert.equal(data[2], 4);
}
