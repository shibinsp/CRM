import { type AllMetadataName } from 'beeax-shared/metadata';

export type InferDeletionFromMissingEntities =
  | true
  | Partial<Record<AllMetadataName, boolean>>
  | undefined;
