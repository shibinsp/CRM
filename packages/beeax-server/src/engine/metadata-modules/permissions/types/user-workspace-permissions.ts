import { type ObjectsPermissions } from 'beeax-shared/types';
import { type PermissionFlagType } from 'beeax-shared/constants';

export type UserWorkspacePermissions = {
  permissionFlags: Record<PermissionFlagType, boolean>;
  objectsPermissions: ObjectsPermissions;
};
