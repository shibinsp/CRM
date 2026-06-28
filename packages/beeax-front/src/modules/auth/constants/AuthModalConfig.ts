import { type ModalOverlay, type ModalSize } from 'beeax-ui/surfaces';
import { AppPath } from 'beeax-shared/types';

type AuthModalConfigType = {
  size: ModalSize;
  overlay: ModalOverlay;
  showScrollWrapper: boolean;
};

export const AUTH_MODAL_CONFIG: {
  default: AuthModalConfigType;
  [key: string]: AuthModalConfigType;
} = {
  default: {
    size: 'medium',
    overlay: 'dark',
    showScrollWrapper: true,
  },
  [AppPath.BookCall]: {
    size: 'extraLarge',
    overlay: 'transparent',
    showScrollWrapper: false,
  },
};
