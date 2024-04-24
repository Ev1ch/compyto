import { createRunner } from '@compyto/runner';

import assert = require('assert');

export default async function start() {
  const { communicator } = await createRunner();
  await communicator.start();
  const MASTER = 0;
  console.log('Started the app');
  const TOTAL = 10000;
  const data = new Array(TOTAL).fill(1);
  const res = [];

  await communicator.gather(data, TOTAL, res, TOTAL, MASTER);

  console.log(`Received: `, res.length);

  if (communicator.isMaster) {
    assert.equal(res.length, TOTAL * 3);
  }
}
