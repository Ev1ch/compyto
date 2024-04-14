import type { Logger } from '@compyto/logging';
import type { Monitoring } from '@compyto/monitoring';
import type { Settings } from '@compyto/settings';
import type { Xor } from '@compyto/utils';

type Runtime = Xor<
  {
    settings: Settings;
    monitoring?: Monitoring;
    logger: Logger;
  },
  {
    settings: null;
    monitoring: null;
    logger: null;
  }
>;

export default Runtime;
