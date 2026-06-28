import { styled } from '@linaria/react';
import { IconButton } from 'beeax-ui/input';
import { IconChevronDown, IconChevronUp } from 'beeax-ui/icon';
import { themeCssVariables } from 'beeax-ui/theme-constants';

type EventCardToggleButtonProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const StyledButtonContainer = styled.div`
  border-radius: ${themeCssVariables.border.radius.sm};
`;

export const EventCardToggleButton = ({
  isOpen,
  setIsOpen,
}: EventCardToggleButtonProps) => {
  return (
    <StyledButtonContainer>
      <IconButton
        Icon={isOpen ? IconChevronUp : IconChevronDown}
        onClick={() => setIsOpen(!isOpen)}
        size="small"
        variant="secondary"
      />
    </StyledButtonContainer>
  );
};
