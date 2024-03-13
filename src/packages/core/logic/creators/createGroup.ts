import type { Group, Process } from '../../domain';

export default function createGroup(): Group {
  const processes: Process[] = [];
  const add = processes.push.bind(processes);

  function remove(process: Process) {
    const index = processes.indexOf(process);

    if (index !== -1) {
      processes.splice(index, 1);
    }
  }

  function* iterator() {
    for (const process of processes) {
      yield process;
    }
  }

  return {
    processes,
    add,
    remove,
    [Symbol.iterator]: iterator,
  };
}
