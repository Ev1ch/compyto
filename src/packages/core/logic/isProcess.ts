import type { Process } from '../domain';
import { ProcessSchema } from '../schemas';

export default function isProcess(value: unknown): value is Process {
  return ProcessSchema.isValidSync(value);
}
