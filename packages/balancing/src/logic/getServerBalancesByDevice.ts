import { getStringURI, type Device } from '@compyto/connections';

import type { Balance } from '../domain';
import getBalancesByDevice from './getBalancesByDevice';

export default function getServerBalancesByDevice(
  balances: Balance[],
  device: Device,
) {
  return getBalancesByDevice(balances, device).filter(
    ({ server }) => getStringURI(server.uri) === getStringURI(device.uri),
  );
}
