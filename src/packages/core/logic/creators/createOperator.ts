import type { Operator, WorkerWithType } from '../../domain';

export default function createOperator(
  workerWithTypes: WorkerWithType[],
): Operator {
  const types = workerWithTypes.map(({ type }) => type);

  return {
    types,
    apply(value: unknown) {
      const type = typeof value;

      const workerWithType = workerWithTypes.find(
        (workerWithType) => workerWithType.type === type,
      );

      if (!workerWithType) {
        throw new Error(`Worker is not found for type: ${type}`);
      }

      const { worker } = workerWithType;

      return worker.perform(value);
    },
  };
}
