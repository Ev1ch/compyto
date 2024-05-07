import type { Logger } from '@compyto/logging';
import type { Monitoring } from '@compyto/monitoring';
import type { Settings } from '@compyto/settings';

type Runtime = {
  settings?: Settings;
  monitoring?: Monitoring;
  logger?: Logger;
};

export default Runtime;
