import type State from './State';
import type Device from './Device';

export default interface Connection {
  state: State;
  device: Device;
}
