import { COLOR_TO_PRINT_METHOD_MAP, TIMESTAMP_COLOR } from '../constants';
import getTimestamp from './getTimestamp';

export default function getColoredTimestamp() {
  const getColored = COLOR_TO_PRINT_METHOD_MAP[TIMESTAMP_COLOR];

  return getColored(`[${getTimestamp()}]`);
}
