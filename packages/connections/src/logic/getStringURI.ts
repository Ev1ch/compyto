import type { URI } from '../domain';

/**
 * An util, that returns a string representation
 * of the URI object.
 */
export default function getStringURI(uri: URI) {
  return `${uri.path}:${uri.port}`;
}
