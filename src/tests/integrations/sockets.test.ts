import type { Communicator } from '@/connections/domain';

import { getRandomCommunicators } from '../logic';

let communicators: Communicator[];

beforeAll(async () => {
  communicators = await getRandomCommunicators(3);
});

test('start', async () => {
  await Promise.all(communicators.map((communicator) => communicator.start()));
});

test('send', async () => {
  await Promise.all(
    communicators.map((communicator) => {
      const { process: selfProcess } = communicator;
      const { processes } = communicator.group;

      return processes.map((process) =>
        communicator.send(selfProcess.code, [process]),
      );
    }),
  );
});

test('receive', async () => {
  await Promise.all(
    communicators.map(async (communicator) => {
      const { processes, size } = communicator.group;

      const receives = await Promise.all(
        Array.from({ length: size }, () => communicator.receive()),
      );

      receives.forEach(({ data }, index) => {
        expect(data).toBe(processes[index].code);
      });
    }),
  );
});

test('finalize', async () => {
  await Promise.all([communicators[0].finalize()]);
  await Promise.all(
    communicators.slice(1).map((communicator) => communicator.finalize()),
  );
});
