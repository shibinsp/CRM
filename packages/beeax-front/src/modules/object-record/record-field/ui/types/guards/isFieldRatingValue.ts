import { RATING_VALUES } from 'beeax-shared/constants';
import { type FieldRatingValue } from 'beeax-shared/types';

export const isFieldRatingValue = (
  fieldValue: unknown,
): fieldValue is FieldRatingValue =>
  RATING_VALUES.includes(fieldValue as NonNullable<FieldRatingValue>);
