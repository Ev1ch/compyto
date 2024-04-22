import { Device } from '@compyto/connections';

export default function getBalanceKey(a: Device, b: Device) {
  return [a.process.code, b.process.code].sort().join(' -> ');
}
