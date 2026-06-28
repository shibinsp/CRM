import { type ApplicationManifest } from 'beeax-shared/application';

export type ApplicationConfig = Omit<
  ApplicationManifest,
  | 'packageJsonChecksum'
  | 'yarnLockChecksum'
  | 'postInstallLogicFunction'
  | 'preInstallLogicFunction'
  | 'defaultRoleUniversalIdentifier'
  | 'aboutDescription'
> & {
  /**
   * @deprecated Use `defineApplicationRole()` in your role file instead.
   */
  defaultRoleUniversalIdentifier?: string;
};
