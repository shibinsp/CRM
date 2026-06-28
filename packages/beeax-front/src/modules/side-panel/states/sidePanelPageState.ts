import { createAtomState } from '@/ui/utilities/state/jotai/utils/createAtomState';
import { SidePanelPages } from 'beeax-shared/types';

export const sidePanelPageState = createAtomState<SidePanelPages>({
  key: 'side-panel/sidePanelPageState',
  defaultValue: SidePanelPages.CommandMenuDisplay,
});
