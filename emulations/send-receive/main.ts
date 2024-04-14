import { ProcessWithData } from '@compyto/connections';
import { createRunner } from '@compyto/runner';

export default async function start() {
  const { communicator } = await createRunner();
  await communicator.start();
  const data1: ProcessWithData[] = [];
  const data2: ProcessWithData[] = [];
  console.log('Started', communicator.group);
  for (const process of communicator.group.processes) {
    console.log('Sending hello to', process);
    communicator.send(`Hello from ${communicator.process.code}`, process);
  }

  await communicator.receive(data1);
  await communicator.receive(data2);

  console.log('Received', data1, data2);
}
