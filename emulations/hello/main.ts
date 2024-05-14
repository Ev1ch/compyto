import { createRunner } from '@compyto/runner';

import 'node:test';

import assert = require('assert');

export default async function start() {
  const { communicator } = await createRunner();
  await communicator.start();
  const data1: number[] = [];
  const data2: number[] = [];
  console.log('Started', communicator.group);
  for (const process of communicator.group.processes) {
    console.log('Sending hello to', process);
    communicator.send(communicator.process.rank, process);
  }

  await communicator.receive(data1);
  await communicator.receive(data2);

  // console.log('Received', data1, data2);
  // testing
  const allData = [...data1, ...data2].sort((a, b) => a - b);
  switch (communicator.process.rank) {
    case 0:
      assert.equal(allData[0], 1);
      assert.equal(allData[1], 2);
      break;
    case 1:
      assert.equal(allData[0], 0);
      assert.equal(allData[1], 2);
      break;
    case 2:
      assert.equal(allData[0], 0);
      assert.equal(allData[1], 1);
      break;
    default:
      throw new Error('Wrong ranks');
  }
  await communicator.finalize();
}
