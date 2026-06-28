import { capitalize } from 'beeax-shared/utils';
export const getUpdateOneRecordMutationResponseField = (
  objectNameSingular: string,
) => `update${capitalize(objectNameSingular)}`;
