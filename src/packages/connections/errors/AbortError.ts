import { DEFAULT_ABORT_MESSAGE } from '../constants';

/**
 * Custom error class for aborting a connection
 * and provide additional/default data.
 */
export default class AbortError extends Error {
  constructor(message = DEFAULT_ABORT_MESSAGE) {
    super(message);
  }
}
