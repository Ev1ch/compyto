import type { Group, Process } from '@/core/domain';

import type Abort from './Abort';
import type Data from './Data';
import type { ProcessWithData } from './Data';

/**
 * Core network abstraction which allows to
 * communicate between {@link packages/core/domain/Process.Process | processes}, give methods for
 * this communication and provides information about
 * {@link packages/core/domain/Process.Process | processes} which are present in the network.
 */
export default interface Communicator {
  isMaster: boolean;
  process: Process;
  group: Group;
  start(): Promise<void>;
  send(data: Data, processes: Process[], abort?: Abort): Promise<void>;
  receive(abort?: Abort): Promise<ProcessWithData>;
  broadcast(data: Data, abort?: Abort): Promise<void>;
}
