import type { Code, Process } from '../../domain';

export default function createProcess(code: Code, rank: number): Process {
  return {
    code,
    rank,
  };
}
