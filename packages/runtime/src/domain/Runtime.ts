import type { Dashboard } from '@compyto/dashboard';
import type { Logger } from '@compyto/logging';
import type { Monitoring } from '@compyto/monitoring';
import type { Settings } from '@compyto/settings';

type Runtime = {
  settings?: Settings;
  monitoring?: Monitoring;
  logger?: Logger;
  dashboard?: Dashboard;
};

export default Runtime;
