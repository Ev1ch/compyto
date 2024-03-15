import type { Group, Process } from '@/core/domain';

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
  send(data: unknown, processes: Process[]): Promise<void>;
  receive(): Promise<unknown>;
  broadcast(data: unknown): Promise<void>;
}
