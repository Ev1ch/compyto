import { type Process } from '../domain';

export default function areProcessesEqual(a: Process, b: Process) {
  return a.rank === b.rank;
}
