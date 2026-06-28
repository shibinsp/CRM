import { capitalize } from 'beeax-shared/utils';

export const getUpdateManyRecordsMutationResponseField = (
  objectNamePlural: string,
) => `update${capitalize(objectNamePlural)}`;
