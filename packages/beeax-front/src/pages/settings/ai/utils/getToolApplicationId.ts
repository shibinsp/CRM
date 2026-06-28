import { type CurrentWorkspace } from '@/auth/states/currentWorkspaceState';
import { type SettingsAgentToolItem } from '~/pages/settings/ai/types/SettingsAgentToolItem';
import { TWENTY_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER } from 'beeax-shared/application';
import { isDefined } from 'beeax-shared/utils';

export const getToolApplicationId = (
  tool: SettingsAgentToolItem,
  currentWorkspace: CurrentWorkspace | null,
): string => {
  if (isDefined(tool.applicationId)) {
    return tool.applicationId;
  }

  return (
    currentWorkspace?.installedApplications?.find(
      (app) =>
        app.universalIdentifier ===
        TWENTY_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER,
    )?.id ?? ''
  );
};
