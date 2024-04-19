import type { Position } from '@/modules/analysis/domain';

const getTopAndHeight = (a: Position, b: Position) => {
  const top = a.top + 10;
  const height = b.top - a.top + 6;

  return { top, height };
};

export default getTopAndHeight;
