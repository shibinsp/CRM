import { type ObjectRecord as SharedObjectRecord } from 'beeax-shared/types';

export type BaseObjectRecord = SharedObjectRecord & {
  __typename: string;
};
