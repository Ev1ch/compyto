import type { Group, Process } from '../../domain';

export default function createGroup(): Group {
  const processes: Process[] = [];

  return {
    processes,
    add: processes.push.bind(processes),
    remove(process) {
      const index = processes.indexOf(process);

      if (index !== -1) {
        processes.splice(index, 1);
      }
    },
    [Symbol.iterator]: function* () {
      for (const process of processes) {
        yield process;
      }
    },
  };
}
