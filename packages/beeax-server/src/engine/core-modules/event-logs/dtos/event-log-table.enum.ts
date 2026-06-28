import { registerEnumType } from '@nestjs/graphql';

import { EventLogTable } from 'beeax-shared/types';

export const registerEventLogTableEnum = () => {
  registerEnumType(EventLogTable, {
    name: 'EventLogTable',
  });
};
