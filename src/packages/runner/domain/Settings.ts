import type { URI } from '@/connections/domain';
import type { Code, Process } from '@/core/domain';
import type { Xor } from '@/utils/domain';

import type SettingsMaster from './SettingsMaster';

type Settings = {
  code: Code;
  uri: URI;
} & Xor<
  { isMaster: true; clients: Process[] },
  {
    isMaster?: false;
    master: SettingsMaster;
  }
>;

export default Settings;
