import type { Device } from '@/connections/domain';

export default function createBalance(client: Device, server: Device) {
  return {
    client,
    server,
  };
}
