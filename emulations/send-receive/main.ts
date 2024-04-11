import { createRunner } from '@compyto/runner';

export default async function start() {
  const { communicator } = await createRunner();
  await communicator.start();

  console.log('Started', communicator.group);
  2;
  for (const process of communicator.group) {
    console.log('Sending hello to', process);
    communicator.send(`Hello from ${communicator.process.code}`, [process]);
  }

  const data1 = await communicator.receive();
  const data2 = await communicator.receive();

  console.log('Received', data1, data2);
}
