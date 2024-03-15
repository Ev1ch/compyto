import { MAX_PORT, MIN_PORT } from '../constants';
import getRandomNumberInRange from './getRandomNumberInRange';

export default function getRandomPort() {
  return getRandomNumberInRange(MIN_PORT, MAX_PORT);
}
