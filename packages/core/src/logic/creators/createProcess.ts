import type { Code, Process } from '../../domain';

export default function createProcess(code: Code): Process {
  return {
    code,
  };
}
