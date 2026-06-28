import { type OrderBy } from 'beeax-shared/types';
import { assertUnreachable } from 'beeax-shared/utils';

export const turnOrderByIntoSort = (orderBy: OrderBy): 'asc' | 'desc' => {
  if (orderBy === 'AscNullsFirst' || orderBy === 'AscNullsLast') {
    return 'asc';
  } else if (orderBy === 'DescNullsFirst' || orderBy === 'DescNullsLast') {
    return 'desc';
  } else {
    assertUnreachable(orderBy);
  }
};
