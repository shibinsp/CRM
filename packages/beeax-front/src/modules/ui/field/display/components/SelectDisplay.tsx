import { type IconComponent } from 'beeax-ui/icon';
import { Tag } from 'beeax-ui/data-display';
import { type ThemeColor } from 'beeax-ui/theme';

type SelectDisplayProps = {
  color: ThemeColor | 'transparent';
  label: string;
  Icon?: IconComponent;
  preventPadding?: boolean;
};

export const SelectDisplay = ({
  color,
  label,
  Icon,
  preventPadding,
}: SelectDisplayProps) => {
  return (
    <Tag
      preventShrink
      color={color}
      text={label}
      Icon={Icon}
      preventPadding={preventPadding}
    />
  );
};
