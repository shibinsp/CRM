import { type ObjectRecord } from 'beeax-shared/types';
import { fastDeepEqual } from 'beeax-shared/utils';

import { type BaseWorkspaceEntity } from 'src/engine/beeax-orm/base.workspace-entity';

export const objectRecordChangedProperties = <
  PRecord extends Partial<ObjectRecord | BaseWorkspaceEntity> =
    Partial<ObjectRecord>,
>(
  oldRecord: PRecord,
  newRecord: PRecord,
) => {
  const changedProperties = Object.keys(newRecord).filter(
    // @ts-expect-error legacy noImplicitAny
    (key) => !fastDeepEqual(oldRecord[key], newRecord[key]),
  );

  return changedProperties;
};
