import { type CommandMenuItemManifest } from 'beeax-shared/application';

export type CommandMenuItemConfig = Omit<
  CommandMenuItemManifest,
  'conditionalAvailabilityExpression'
> & {
  conditionalAvailabilityExpression?: boolean | string;
};
