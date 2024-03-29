import type { Group, Process } from '@compyto/core';

import type Abort from './Abort';
import type Data from './Data';
import type { ProcessWithData } from './Data';

/**
 * Core network abstraction which allows to
 * communicate between {@link core/src.Process | processes}, give methods for
 * this communication and provides information about
 * {@link core/src.Process | processes} which are present in the network.
 */
export default interface Communicator {
  isMaster: boolean;
  process: Process;
  group: Group;
  start(): Promise<void>;
  send(data: Data, processes: Process[], abort?: Abort): Promise<void>;
  receive(abort?: Abort): Promise<ProcessWithData>;
  broadcast(data: Data, abort?: Abort): Promise<void>;
  finalize(): Promise<void>;
}
