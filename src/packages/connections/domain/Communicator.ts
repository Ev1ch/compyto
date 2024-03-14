import type { Group, Process } from '@/core/domain';

import type Abort from './Abort';

export default interface Communicator {
  isMaster: boolean;
  process: Process;
  group: Group;
  start(): Promise<void>;
  send(data: unknown, processes: Process[], abort?: Abort): Promise<void>;
  receive(abort?: Abort): Promise<unknown>;
  broadcast(data: unknown, abort?: Abort): Promise<void>;
}
