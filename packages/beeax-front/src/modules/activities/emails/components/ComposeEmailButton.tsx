import { useComposeEmailForTargetRecord } from '@/activities/emails/hooks/useComposeEmailForTargetRecord';
import { IconPlus } from 'beeax-ui/icon';
import { LightIconButton } from 'beeax-ui/input';

export const ComposeEmailButton = () => {
  const { openComposer, loading } = useComposeEmailForTargetRecord();

  return (
    <LightIconButton
      Icon={IconPlus}
      accent="tertiary"
      size="small"
      onClick={openComposer}
      disabled={loading}
    />
  );
};
