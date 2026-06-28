import { type RecordGqlOperationFilter } from 'beeax-shared/types';
import { isDefined } from 'beeax-shared/utils';

export const makeOrFilterVariables = (
  filters: (RecordGqlOperationFilter | undefined)[],
): RecordGqlOperationFilter | undefined => {
  const definedFilters = filters.filter(isDefined);

  if (!definedFilters.length) return undefined;

  return definedFilters.length === 1
    ? definedFilters[0]
    : { or: definedFilters };
};
