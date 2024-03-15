import type Device from './Device';
import type State from './State';

/**
 * Entity that represents the connection
 * between the peers
 */
export default interface Connection {
  state: State;
  device: Device;
}
