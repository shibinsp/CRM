import { registerEnumType } from '@nestjs/graphql';

import { UpgradeHealthEnum } from 'beeax-shared/types';

export { UpgradeHealthEnum };

registerEnumType(UpgradeHealthEnum, {
  name: 'UpgradeHealth',
});
