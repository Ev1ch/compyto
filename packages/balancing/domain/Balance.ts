import { Device } from '@/connections/domain';

export default interface Balance {
  client: Device;
  server: Device;
}
