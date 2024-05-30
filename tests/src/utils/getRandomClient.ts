import type { Process, Rank } from '@compyto/core';

import getRandomCode from './getRandomCode';

export default function getRandomClient(rank: Rank): Process {
  return {
    code: getRandomCode(),
    rank,
  };
}
