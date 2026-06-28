import { SettingsPath } from 'beeax-shared/types';
import { getSettingsPath } from 'beeax-shared/utils';

export const APPLICATION_REGISTRATION_ADMIN_PATH = getSettingsPath(
  SettingsPath.AdminPanel,
  undefined,
  undefined,
  'apps',
);
