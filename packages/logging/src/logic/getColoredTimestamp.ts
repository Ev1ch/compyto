import { COLOR_TO_PRINT_METHOD_MAP, TIMESTAMP_COLOR } from '../constants';

export default function getColoredTimestamp() {
  const date = new Date().toISOString().replace('Z', '');
  const getColored = COLOR_TO_PRINT_METHOD_MAP[TIMESTAMP_COLOR];

  return getColored(`[${date.substring(date.indexOf('T') + 1)}]`);
}
