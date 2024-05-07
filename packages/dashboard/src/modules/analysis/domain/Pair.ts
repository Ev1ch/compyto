import type { Id } from '@compyto/utils';

export default interface Pair {
  readonly id: Id;
  readonly eventIds: string[];
}
