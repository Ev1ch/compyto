import { getStringURI, type Device } from '@compyto/connections';

import type { Balance } from '../domain';
import getBalancesByDevice from './getBalancesByDevice';

export default function getClientBalancesByDevice(
  balances: Balance[],
  device: Device,
) {
  return getBalancesByDevice(balances, device).filter(
    ({ client }) => getStringURI(client.uri) === getStringURI(device.uri),
  );
}
