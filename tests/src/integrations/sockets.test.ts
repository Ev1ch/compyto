import type { Communicator } from '@compyto/connections';
import { runtime } from '@compyto/runtime';

import { getRandomCommunicators } from '../logic';
import { monitoringMock } from '../utils';

let communicators: Communicator[];

beforeAll(async () => {
  communicators = await getRandomCommunicators(3);
  runtime.monitoring = monitoringMock;
});

test('start', async () => {
  console.log('Start method called');

  await Promise.all(communicators.map((communicator) => communicator.start()));
});

test('send', async () => {
  console.log('Communication started');

  await Promise.all(
    communicators.map((communicator) => {
      const { process: selfProcess } = communicator;
      const { processes } = communicator.group;

      console.log('Data was sent');
      return processes.map((process) =>
        communicator.send(selfProcess.code, process),
      );
    }),
  );
});

test('receive', async () => {
  await Promise.all(
    communicators.map(async (communicator) => {
      const { processes, size } = communicator.group;

      const buffers = Array.from({ length: size }, () => []);
      await Promise.all(buffers.map((buffer) => communicator.receive(buffer)));

      buffers.forEach(([data], index) => {
        expect(data).toBe(processes[index].code);
      });
      console.log('Data was received');
    }),
  );
});

test('finalize', async () => {
  console.log('Communication finished, finalize called.');

  await Promise.all(
    communicators.map((communicator) => communicator.finalize()),
  );
});
