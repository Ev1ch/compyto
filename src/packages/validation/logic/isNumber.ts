import isNaN from './isNaN';

export default function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}
