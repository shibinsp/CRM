import * as Sentry from '@sentry/node';

type WorkspaceSentryFields = {
  workspaceId: string;
  userWorkspaceId?: string;
};

export const applyWorkspaceSentryFields = (
  fields: WorkspaceSentryFields,
): void => {
  Sentry.setUser({
    id: fields.userWorkspaceId ?? fields.workspaceId,
  });

  Sentry.setTag('beeax.workspace.id', fields.workspaceId);
  if (fields.userWorkspaceId) {
    Sentry.setTag('beeax.user_workspace.id', fields.userWorkspaceId);
  }

  Sentry.setContext('beeax', {
    workspace_id: fields.workspaceId,
    ...(fields.userWorkspaceId && {
      user_workspace_id: fields.userWorkspaceId,
    }),
  });
};
