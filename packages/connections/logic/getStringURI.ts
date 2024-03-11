import type { URI } from '../domain';

export default function getStringURI(uri: URI) {
  return `${uri.path}:${uri.port}`;
}
