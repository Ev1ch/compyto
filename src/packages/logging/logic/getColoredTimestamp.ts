import { COLOR_TO_PRINT_METHOD_MAP, TIMESTAMP_COLOR } from '../constants';

export default function getColoredTimestamp() {
  const date = new Date().toISOString().replace('Z', '');

  return COLOR_TO_PRINT_METHOD_MAP[TIMESTAMP_COLOR](
    `[${date.substring(date.indexOf('T') + 1)}]`,
  );
}
