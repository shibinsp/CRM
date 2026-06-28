import { SettingsPath } from 'beeax-shared/types';
import { getSettingsPath } from 'beeax-shared/utils';

export const AI_ADMIN_PATH = getSettingsPath(
  SettingsPath.AdminPanel,
  undefined,
  undefined,
  'ai',
);
