import { type ObjectRecord } from 'beeax-shared/types';

export type CommonFindDuplicatesOutputItem = {
  records: ObjectRecord[];
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
};
