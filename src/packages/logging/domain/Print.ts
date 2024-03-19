import type { UnknownArgs } from '@/core/domain';

/**
 * Represents core printing method
 */
type Print = (...args: UnknownArgs) => void;

export default Print;
