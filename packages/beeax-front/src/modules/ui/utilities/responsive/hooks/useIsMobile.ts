import { useMediaQuery } from 'react-responsive';
import { MOBILE_VIEWPORT } from 'beeax-ui/theme-constants';

export const useIsMobile = () =>
  useMediaQuery({ query: `(max-width: ${MOBILE_VIEWPORT}px)` });
