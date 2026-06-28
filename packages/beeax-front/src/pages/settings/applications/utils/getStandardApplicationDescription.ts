import { t } from '@lingui/core/macro';

export const getStandardApplicationDescription =
  (): string => t`The base data model every BeeAX workspace runs on.

#### What "foundation" means

Every BeeAX workspace starts with this set of objects. They define the shape of your CRM, including relationships, activity, and reporting. Everything else, including marketplace apps, AI agents, and custom objects, plugs into them.

#### Included objects
- **People & Companies**: contact and account records
- **Opportunities**: your sales pipeline
- **Notes & Tasks**: activity and follow-ups
- **Workflows & Dashboards**: automation and reporting

Remove this app and the rest of BeeAX has nothing to hang off.

#### Build your own app

Extend BeeAX with your own objects, fields, logic functions, or AI skills. Scaffold a new app in one command:

\`\`\`bash
npx create-beeax-app@latest my-beeax-app
\`\`\`

Then inside the folder:

\`\`\`bash
cd my-beeax-app
yarn beeax dev
\`\`\`

See the [Getting Started guide](https://beeax.com/developers/extend/apps/getting-started) for the full walkthrough, and [Building Apps](https://beeax.com/developers/extend/apps/building) for the \`defineApplication\` / \`defineEntity\` APIs.`;
