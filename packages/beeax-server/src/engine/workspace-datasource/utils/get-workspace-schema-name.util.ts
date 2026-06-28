import { uuidToBase36 } from 'beeax-shared/utils';

export const getWorkspaceSchemaName = (workspaceId: string): string => {
  return `workspace_${uuidToBase36(workspaceId)}`;
};
