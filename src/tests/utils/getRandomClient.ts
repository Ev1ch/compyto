import type { Process } from '@/core/domain';

import getRandomCode from './getRandomCode';

export default function getRandomClient(): Process {
  return {
    code: getRandomCode(),
  };
}
