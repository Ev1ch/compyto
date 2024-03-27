import type { Process } from '@compyto/core';

import getRandomCode from './getRandomCode';

export default function getRandomClient(): Process {
  return {
    code: getRandomCode(),
  };
}
