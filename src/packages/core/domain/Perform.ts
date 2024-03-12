export type UnknownArgs = unknown[];

type Perform<TArgs extends UnknownArgs, TValue> = (...args: TArgs) => TValue;

export default Perform;
