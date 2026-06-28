import { IconCheckbox, type IconComponent, IconNotes } from 'beeax-ui/icon';
export const getIconForObjectType = (
  objectType: string,
): IconComponent | undefined => {
  switch (objectType) {
    case 'note':
      return IconNotes;
    case 'task':
      return IconCheckbox;
    default:
      return undefined;
  }
};
