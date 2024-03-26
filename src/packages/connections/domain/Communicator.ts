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
  send<TData extends Data>(
    data: TData,
    processes: Process[],
    abort?: Abort,
  ): Promise<void>;
  receive(abort?: Abort): Promise<ProcessWithData>;
  broadcast<TData extends Data>(data: TData, abort?: Abort): Promise<void>;
  scatter<TData extends Data>(
    data: TData[],
    sendCount: number,
    receiveBuf: Data[],
    receiveCount: number,
    abort?: Abort,
  ): Promise<void>;
  finalize(): Promise<void>;
}
