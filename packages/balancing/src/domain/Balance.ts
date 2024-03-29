import type { Device } from '@compyto/connections';

/**
 * Entity that represents the pair of
 * client and server for devices for P2P connection
 * of P2P network.
 */
export default interface Balance {
  readonly client: Device;
  readonly server: Device;
}
