import type { UnknownArgs } from '@compyto/core/domain';

/**
 * Represents core printing method.
 */
type Print = (...args: UnknownArgs) => void;

export default Print;
