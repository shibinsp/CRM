import { useLingui } from '@lingui/react/macro';
import { isNonEmptyString } from '@sniptt/guards';

import { SettingsPublicDomainsListCard } from '@/settings/domains/components/SettingsPublicDomainsListCard';
import { useGetLogicFunctionHttpUrl } from '@/settings/logic-functions/hooks/useGetLogicFunctionHttpUrl';
import { getFunctionsBaseUrl } from '@/settings/logic-functions/utils/getLogicFunctionHttpUrl';
import { SettingsTextInput } from '@/ui/input/components/SettingsTextInput';
import { Info } from 'beeax-ui/feedback';
import { IconCopy } from 'beeax-ui/icon';
import { Section } from 'beeax-ui/layout';
import { H2Title } from 'beeax-ui/typography';
import { useCopyToClipboard } from '~/hooks/useCopyToClipboard';

export const SettingsApplicationFunctionDomainSection = ({
  applicationId,
}: {
  applicationId: string;
}) => {
  const { t } = useLingui();
  const { copyToClipboard } = useCopyToClipboard();
  const { publicFunctionDomain, workspaceSubdomain } =
    useGetLogicFunctionHttpUrl();

  const baseUrl = getFunctionsBaseUrl({
    publicFunctionDomain,
    workspaceSubdomain,
  });

  return (
    <>
      {isNonEmptyString(baseUrl) && (
        <Section>
          <H2Title
            title={t`Public URL`}
            description={t`Your HTTP-triggered logic functions are served from this dedicated domain, isolated from your main workspace. Because it shares nothing with your app, functions can return any header — including custom headers, Permissions-Policy, Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy.`}
          />
          <SettingsTextInput
            instanceId="application-public-function-domain"
            label={t`Base URL`}
            value={baseUrl}
            onChange={() => {}}
            readOnly
            fullWidth
            RightIcon={IconCopy}
            onRightIconClick={() =>
              copyToClipboard(baseUrl, t`URL copied to clipboard`)
            }
          />
          <Info
            text={t`Each HTTP route is reachable at ${baseUrl}/your-route. The legacy /s/ endpoint stays available for self-hosting and existing routes.`}
          />
        </Section>
      )}
      <Section>
        <H2Title
          title={t`Public Domains`}
          description={t`Bind a dedicated domain to serve this app's HTTP routes, isolated from your main workspace.`}
        />
        <SettingsPublicDomainsListCard applicationId={applicationId} />
      </Section>
    </>
  );
};
