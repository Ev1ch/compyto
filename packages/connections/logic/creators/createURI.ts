import type { URI } from '../../domain';

export default function createURI(path: string, port: number): URI {
  return {
    path,
    port,
  };
}
