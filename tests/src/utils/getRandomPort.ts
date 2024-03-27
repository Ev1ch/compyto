import { MAX_PORT, MIN_PORT } from '../constants';
import getRandomNumberInRange from './getRandomNumberInRange';

export default function getRandomPort(): number {
  return getRandomNumberInRange(MIN_PORT, MAX_PORT);
}
