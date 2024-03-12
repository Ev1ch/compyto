import { isJSON } from '@/validation/logic';

import type { Settings } from '../domain';
import validateSettings from './validateSettings';

export default function createSettings(content: string): Settings {
  if (!isJSON(content)) {
    throw new Error('Settings is not a valid JSON');
  }

  const settings = JSON.parse(content);

  validateSettings(settings);

  return settings;
}
