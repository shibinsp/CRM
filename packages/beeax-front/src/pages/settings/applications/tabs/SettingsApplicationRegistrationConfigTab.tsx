import type { ApplicationRegistrationData } from '~/pages/settings/applications/tabs/types/ApplicationRegistrationData';
import { useQuery } from '@apollo/client/react';
import { FindApplicationRegistrationVariablesDocument } from '~/generated-metadata/graphql';
import { FindAdminApplicationRegistrationVariablesDocument } from '~/generated-admin/graphql';
import { Section } from 'beeax-ui/layout';
import { Status } from 'beeax-ui/data-display';
import { H2Title } from 'beeax-ui/typography';
import { useLingui } from '@lingui/react/macro';
import { getSettingsPath } from 'beeax-shared/utils';
import { SettingsPath } from 'beeax-shared/types';
import { ConfigVariableTable } from '@/settings/config-variables/components/ConfigVariableTable';
import { useApolloAdminClient } from '@/settings/admin-panel/apollo/hooks/useApolloAdminClient';

export const SettingsApplicationRegistrationConfigTab = ({
  registration,
  fromAdmin,
}: {
  registration: ApplicationRegistrationData;
  fromAdmin?: boolean;
}) => {
  const { t } = useLingui();
  const apolloAdminClient = useApolloAdminClient();

  const applicationRegistrationId = registration.id;

  const { data: workspaceVariablesData } = useQuery(
    FindApplicationRegistrationVariablesDocument,
    {
      variables: { applicationRegistrationId },
      skip: !applicationRegistrationId || fromAdmin === true,
    },
  );

  const { data: adminVariablesData } = useQuery(
    FindAdminApplicationRegistrationVariablesDocument,
    {
      client: apolloAdminClient,
      variables: { applicationRegistrationId },
      skip: !applicationRegistrationId || fromAdmin !== true,
    },
  );

  const variables = fromAdmin
    ? (adminVariablesData?.findAdminApplicationRegistrationVariables ?? [])
    : (workspaceVariablesData?.findApplicationRegistrationVariables ?? []);

  const configVariables = variables.map((variable) => ({
    name: variable.key,
    description: variable.description,
    value: variable.value ?? <Status color="gray" text={t`Not set`} />,
    to: getSettingsPath(
      fromAdmin
        ? SettingsPath.AdminPanelApplicationRegistrationConfigVariableDetails
        : SettingsPath.ApplicationRegistrationConfigVariableDetails,
      {
        applicationRegistrationId,
        variableKey: variable.key,
      },
    ),
  }));

  return (
    variables.length > 0 && (
      <Section>
        <H2Title
          title={t`Server Variables`}
          description={t`Server variables are applied to all workspace installations.`}
        />
        <ConfigVariableTable configVariables={configVariables} />
      </Section>
    )
  );
};
