import { capitalize } from 'beeax-shared/utils';
export const getDeleteOneRecordMutationResponseField = (
  objectNameSingular: string,
) => `delete${capitalize(objectNameSingular)}`;
