import { isDefined } from 'beeax-shared/utils';
import { type FullNameMetadata } from 'beeax-shared/types';

export const computeDisplayName = (
  name: FullNameMetadata | null | undefined,
) => {
  if (!name) {
    return '';
  }

  return Object.values(name).filter(isDefined).join(' ');
};
