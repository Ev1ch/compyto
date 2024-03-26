import { getStringURI, type Device } from '@compyto/connections';

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
