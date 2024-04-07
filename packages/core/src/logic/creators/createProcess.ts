import type { Code, Process, Rank } from '../../domain';

export default function createProcess(code: Code, rank: Rank): Process {
  return {
    code,
    rank,
  };
}
