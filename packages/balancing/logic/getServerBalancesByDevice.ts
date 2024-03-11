import type { Device } from '@/connections/domain';
import { getStringURI } from '@/connections/logic';

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
