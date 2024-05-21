import type {
  Operator,
  OperatorType,
  Type,
  UnknownArgs,
  WorkerWithType,
} from '../../domain';

export default function createOperator<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TWorkerWithTypes extends WorkerWithType<any[], any>[],
  TArgs extends UnknownArgs = Parameters<
    TWorkerWithTypes[number]['worker']['perform']
  >,
  TValue = ReturnType<TWorkerWithTypes[number]['worker']['perform']>,
>(
  type: OperatorType,
  workerWithTypes: TWorkerWithTypes,
): Operator<TArgs, TValue> {
  const allowedTypes = workerWithTypes.map(({ type }) => type);

  return {
    type,
    allowedTypes,
    // an array from each process results in array of arrays
    apply(data: unknown[][]) {
      data.flat().forEach((arr) => {
        const argsType = typeof arr;

        if (!allowedTypes.includes(argsType as Type))
          throw new Error(`Not allowed type for operator, ${type}`);

        const workerWithType = workerWithTypes.find((w) => w.type === argsType);
        if (!workerWithType)
          throw new Error(`Worker for this operator is not specified, ${type}`);
      });

      const workerWithType = workerWithTypes.find(
        (w) => w.type === typeof data[0][0], // we can take any here, as we validated types
      );
      const { worker } = workerWithType!;

      const result = [...data[0]];

      // Ensure offset and count are within bounds
      // Iterate through each array and each element
      for (let i = 1; i < data.length; i++) {
        for (let j = 0; j < result.length; j++) {
          result[j] = worker.perform(result[j], data[i][j]);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result as any;
    },
  };
}
