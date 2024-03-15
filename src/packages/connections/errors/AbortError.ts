import { DEFAULT_ABORT_MESSAGE } from '../constants';

export default class AbortError extends Error {
  constructor(message = DEFAULT_ABORT_MESSAGE) {
    super(message);
  }
}
