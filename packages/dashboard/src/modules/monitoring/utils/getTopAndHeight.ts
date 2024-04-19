import type { Position } from '@/modules/analysis/domain';

const getTopAndHeight = (a: Position, b: Position) => {
  const top = a.top + 15;
  const height = b.top - a.top;

  return { top, height };
};

export default getTopAndHeight;
