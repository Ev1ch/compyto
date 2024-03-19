import type {
  Operator,
  OperatorType,
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
    apply() {
      throw new Error('Not implemented');
    },
  };
}
