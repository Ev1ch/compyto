import type { Communicator } from '@/connections/domain';
import { createSocketCommunicator } from '@/connections/sockets/logic';

import { getRandomClientSettings, getRandomMasterSettings } from '../logic';

let masterCommunicator: Communicator;
let client1Communicator: Communicator;
let client2Communicator: Communicator;
let communicators: Communicator[];

beforeAll(async () => {
  const masterSettings = await getRandomMasterSettings(2);

  const client1Settings = await getRandomClientSettings(
    masterSettings.uri,
    masterSettings.clients[0].code,
  );

  const client2Settings = await getRandomClientSettings(
    masterSettings.uri,
    masterSettings.clients[1].code,
  );

  masterCommunicator = createSocketCommunicator(masterSettings);
  client1Communicator = createSocketCommunicator(client1Settings);
  client2Communicator = createSocketCommunicator(client2Settings);
  communicators = [
    masterCommunicator,
    client1Communicator,
    client2Communicator,
  ];
});

test('start', async () => {
  await Promise.all([
    masterCommunicator.start(),
    client1Communicator.start(),
    client2Communicator.start(),
  ]);
});

test('send', async () => {
  await Promise.all(
    communicators.map((communicator) =>
      Promise.all(
        communicator.group.processes.map((process) => {
          return communicator.send(communicator.process.code, [process]);
        }),
      ),
    ),
  );
});

test('receive', async () => {
  await Promise.all(
    communicators.map((communicator) =>
      Promise.all(
        communicator.group.processes.map(async (currentProcess) => {
          const { process } = await communicator.receive();
          expect(process.code).toBe(currentProcess.code);
        }),
      ),
    ),
  );
});
