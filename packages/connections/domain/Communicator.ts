import type { Group, Process } from '@/core/domain';

export default interface Communicator {
  isMaster: boolean;
  group: Group;
  start(): Promise<void>;
  send(data: unknown, processes: Process[]): Promise<void>;
  receive(): Promise<unknown>;
}
