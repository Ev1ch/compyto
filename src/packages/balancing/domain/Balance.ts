import { Device } from '@/connections/domain';

/**
 * Entity that represents the pair of
 * client and server for devices for P2P connection
 * of P2P network.
 */
export default interface Balance {
  client: Device;
  server: Device;
}
