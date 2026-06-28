import { type AvatarType } from 'beeax-ui/data-display';
import { type IconComponent } from 'beeax-ui/icon';

export type SelectableItem<T = object> = T & {
  id: string;
  name: string;
  avatarUrl?: string;
  avatarType?: AvatarType;
  AvatarIcon?: IconComponent;
  isSelected: boolean;
  isIconInverted?: boolean;
};
