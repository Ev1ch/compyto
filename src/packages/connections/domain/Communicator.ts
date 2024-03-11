import type { Group, Process } from '@/core/domain';

export default interface Communicator {
  isMaster: boolean;
  process: Process;
  group: Group;
  start(): Promise<void>;
  send(data: unknown, processes: Process[]): Promise<void>;
  receive(): Promise<unknown>;
  broadcast(data: unknown): Promise<void>;
}
