import type { Device } from '@compyto/connections';

import type { Balance } from '../../domain';
import createBalance from './createBalance';

export default function createBalances(devices: Device[]): Balance[] {
  const balances: Map<string, Balance> = new Map();

  devices.forEach((firstDevice, index) => {
    devices.slice(index + 1).forEach((secondDevice) => {
      const pair = [firstDevice, secondDevice].sort();
      const key = pair.toString();

      balances.set(key, createBalance(firstDevice, secondDevice));
    });
  });

  return Array.from(balances.values());
}
