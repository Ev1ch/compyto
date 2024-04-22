import type { Device } from '@compyto/connections';

import type { Balance } from '../../domain';
import { getBalanceKey } from '../../utils';
import createBalance from './createBalance';

export default function createBalances(devices: Device[]): Balance[] {
  const balances: Map<string, Balance> = new Map();

  devices.forEach((firstDevice, index) => {
    devices.slice(index + 1).forEach((secondDevice) => {
      const key = getBalanceKey(firstDevice, secondDevice);

      balances.set(key, createBalance(firstDevice, secondDevice));
    });
  });

  return Array.from(balances.values());
}
