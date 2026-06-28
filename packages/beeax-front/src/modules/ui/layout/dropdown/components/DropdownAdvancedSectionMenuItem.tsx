import { Trans } from '@lingui/react/macro';
import { IconSettings } from 'beeax-ui/icon';
import { MenuItem } from 'beeax-ui/navigation';

type DropdownAdvancedSectionMenuItemProps = {
  onClick: () => void;
};

export const DropdownAdvancedSectionMenuItem = ({
  onClick,
}: DropdownAdvancedSectionMenuItemProps) => (
  <MenuItem
    text={<Trans>Advanced</Trans>}
    LeftIcon={IconSettings}
    onClick={onClick}
    hasSubMenu
  />
);
