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
    apply(args: unknown[]) {
      const argsType = typeof args[0];

      if (!allowedTypes.includes(argsType as Type))
        throw new Error(`Not allowed type for operator, ${type}`);

      const workerWithType = workerWithTypes.find((w) => w.type === argsType);
      if (!workerWithType)
        throw new Error('Worker for this operator is not specified');

      const { worker } = workerWithType;
      const result = args.reduce(worker.perform);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return [result] as any;
    },
  };
}
