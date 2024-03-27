import type { OperatorType } from '@compyto/core';

import type Data from './Data';

/**
 * This interface represents a command
 * to be executed on other peer in the network.
 */
export default interface Command<TData extends Data> {
  readonly operatorType: OperatorType;
  readonly data: TData;
}
