import { type FieldMetadataItemOption } from '@/object-metadata/types/FieldMetadataItem';
import { isDefined } from 'beeax-shared/utils';
import { type ThemeColor } from 'beeax-ui/theme';

export const getSelectOptionColorForValue = ({
  rawValue,
  selectOptions,
}: {
  rawValue: string | null | undefined;
  selectOptions: FieldMetadataItemOption[] | null | undefined;
}): ThemeColor | undefined => {
  if (!isDefined(selectOptions) || !isDefined(rawValue)) {
    return undefined;
  }

  const option = selectOptions.find((opt) => opt.value === rawValue);

  return option?.color;
};
