import { registerEnumType } from '@nestjs/graphql';

import { NavigationMenuItemType } from 'beeax-shared/types';

registerEnumType(NavigationMenuItemType, {
  name: 'NavigationMenuItemType',
});

export { NavigationMenuItemType };
