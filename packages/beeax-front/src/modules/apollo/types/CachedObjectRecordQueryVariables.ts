import { type RecordGqlOperationVariables } from 'beeax-shared/types';

export type CachedObjectRecordQueryVariables = Omit<
  RecordGqlOperationVariables,
  'limit'
> & { first?: RecordGqlOperationVariables['limit'] };
