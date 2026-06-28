import { type RecordGqlOperationSignature } from 'beeax-shared/types';

export type RecordGqlOperationSignatureFactory<FactoryParams extends object> = (
  factoryParams: FactoryParams,
) => RecordGqlOperationSignature;
