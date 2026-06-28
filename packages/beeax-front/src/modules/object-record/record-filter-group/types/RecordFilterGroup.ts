import { type RecordFilterGroupLogicalOperator } from 'beeax-shared/types';

export type RecordFilterGroup = {
  id: string;
  parentRecordFilterGroupId?: string | null;
  logicalOperator: RecordFilterGroupLogicalOperator;
  positionInRecordFilterGroup?: number | null;
};
