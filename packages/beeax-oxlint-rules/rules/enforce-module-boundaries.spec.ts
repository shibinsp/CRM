import { RuleTester } from 'oxlint/plugins-dev';

import { rule, RULE_NAME } from './enforce-module-boundaries';

const depConstraints = [
  {
    sourceTag: 'scope:frontend',
    onlyDependOnLibsWithTags: ['scope:shared', 'scope:frontend'],
  },
  {
    sourceTag: 'scope:backend',
    onlyDependOnLibsWithTags: ['scope:shared', 'scope:backend'],
  },
  {
    sourceTag: 'scope:shared',
    onlyDependOnLibsWithTags: ['scope:shared'],
  },
];

const ruleTester = new RuleTester();

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: "import { isDefined } from 'beeax-shared';",
      options: [{ depConstraints }],
      filename: '/project/packages/beeax-front/src/utils.ts',
    },
    {
      code: "import { Button } from 'beeax-ui';",
      options: [{ depConstraints }],
      filename: '/project/packages/beeax-front/src/components.tsx',
    },
    {
      code: "import { isDefined } from 'beeax-shared';",
      options: [{ depConstraints }],
      filename: '/project/packages/beeax-server/src/utils.ts',
    },
    {
      code: "import { helper } from './local';",
      options: [{ depConstraints }],
      filename: '/project/packages/beeax-front/src/utils.ts',
    },
    {
      code: "import lodash from 'lodash';",
      options: [{ depConstraints }],
      filename: '/project/packages/beeax-front/src/utils.ts',
    },
    {
      code: "import { isDefined } from 'beeax-shared';",
      options: [{ depConstraints: [] }],
      filename: '/project/packages/beeax-front/src/utils.ts',
    },
  ],
  invalid: [
    {
      code: "import { ServerService } from 'beeax-server';",
      options: [{ depConstraints }],
      filename: '/project/packages/beeax-front/src/bad-import.ts',
      errors: [{ messageId: 'moduleBoundaryViolation' }],
    },
    {
      code: "import { Component } from 'beeax-front';",
      options: [{ depConstraints }],
      filename: '/project/packages/beeax-server/src/bad-import.ts',
      errors: [{ messageId: 'moduleBoundaryViolation' }],
    },
    {
      code: "import { Component } from 'beeax-front';",
      options: [{ depConstraints }],
      filename: '/project/packages/beeax-shared/src/bad-import.ts',
      errors: [{ messageId: 'moduleBoundaryViolation' }],
    },
    {
      code: "import { ServerThing } from 'beeax-server';",
      options: [{ depConstraints }],
      filename: '/project/packages/beeax-shared/src/bad-import.ts',
      errors: [{ messageId: 'moduleBoundaryViolation' }],
    },
  ],
});
