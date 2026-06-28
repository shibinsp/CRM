import { THEME_COMMON } from 'beeax-ui/theme';

// Product layout facts the mockup mirrors that aren't part of beeax-ui's
// theme. The spacing base and nav-item height derive from beeax-ui's spacing
// unit; the drawer width and record-table row height are beeax-front layout
// constants (NavigationDrawerConstraints / RecordTableRowHeight).
export const APP_PREVIEW_CHROME = {
  spacingBasePx: THEME_COMMON.spacingMultiplicator,
  navigationItemHeightPx: THEME_COMMON.spacingMultiplicator * 7,
  navigationDrawerWidthPx: 220,
  recordTableRowHeightPx: 32,
};
