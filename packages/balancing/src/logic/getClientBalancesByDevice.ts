import type { Device } from '@compyto/connections/domain';
import { getStringURI } from '@compyto/connections/logic';

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
