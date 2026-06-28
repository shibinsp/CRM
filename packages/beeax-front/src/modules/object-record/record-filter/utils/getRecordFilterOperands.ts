import {
  type FilterableAndTSVectorFieldType,
  type ViewFilterOperand as RecordFilterOperand,
} from 'beeax-shared/types';
import { getFilterOperandsForFilterableFieldType } from 'beeax-shared/utils';

export const getRecordFilterOperands = ({
  filterType,
  subFieldName,
}: {
  filterType: FilterableAndTSVectorFieldType;
  subFieldName?: string | null | undefined;
}): readonly RecordFilterOperand[] => {
  return getFilterOperandsForFilterableFieldType({
    filterType,
    subFieldName,
  });
};
