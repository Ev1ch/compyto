import type Device from './Device';
import type State from './State';

export default interface Connection {
  state: State;
  device: Device;
}
