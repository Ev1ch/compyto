import type { Device } from '@/connections/domain';
import { getStringURI } from '@/connections/logic';

import type { Balance } from '../domain';

export default function getBalancesByDevice(
  balances: Balance[],
  device: Device,
) {
  return balances.filter(({ server, client }) =>
    [getStringURI(server.uri), getStringURI(client.uri)].includes(
      getStringURI(device.uri),
    ),
  );
}
