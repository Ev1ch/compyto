/**
 * Alias to represent an array of unknown arguments.
 * The alias is  widely used on the domain level
 */
export type UnknownArgs = unknown[];

/**
 * Represents a core {@link packages/core/domain/Worker.Worker | Worker} method that
 * performs worker's operation and returns some value.
 */
type Perform<TArgs extends UnknownArgs, TValue> = (...args: TArgs) => TValue;

export default Perform;
