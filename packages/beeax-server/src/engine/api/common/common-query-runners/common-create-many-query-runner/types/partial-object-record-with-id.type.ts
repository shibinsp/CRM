import { type ObjectRecord } from 'beeax-shared/types';

export type PartialObjectRecordWithId = Partial<ObjectRecord> & { id: string };
