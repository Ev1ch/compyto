import type { Communicator } from '@/connections/domain';
import { createSocketCommunicator } from '@/connections/sockets/logic';

import getRandomClientSettings from './getRandomClientSettings';
import getRandomMasterSettings from './getRandomMasterSettings';

export default async function getRandomCommunicators(
  number: number,
): Promise<Communicator[]> {
  if (number < 2) {
    throw new Error('Number of communicators must be at least 2');
  }

  const clientsNumber = number - 1;
  const masterSettings = await getRandomMasterSettings(clientsNumber);
  const settings = await Promise.all([
    masterSettings,
    ...Array.from({ length: clientsNumber }, (_, index) =>
      getRandomClientSettings(
        masterSettings.uri,
        masterSettings.clients[index].code,
      ),
    ),
  ]);

  return settings.map(createSocketCommunicator);
}
