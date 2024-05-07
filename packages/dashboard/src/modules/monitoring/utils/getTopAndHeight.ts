import type { Position } from '@/modules/analysis/domain';

const getTopAndHeight = (a: Position, b: Position) => {
  const top = a.top + 16.5;
  const height = b.top - a.top + 1;

  return { top, height };
};

export default getTopAndHeight;
