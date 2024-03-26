import type { Device } from '@compyto/connections/domain';
import { getStringURI } from '@compyto/connections/logic';

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
