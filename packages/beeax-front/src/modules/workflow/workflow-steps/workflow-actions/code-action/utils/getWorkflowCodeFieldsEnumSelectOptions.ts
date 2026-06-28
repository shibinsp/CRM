import { isNonEmptyArray } from '@sniptt/guards';
import { isDefined } from 'beeax-shared/utils';
import { type InputSchemaProperty } from 'beeax-shared/workflow';
import { type SelectOption } from 'beeax-ui/input';

export const getWorkflowCodeFieldsEnumSelectOptions = (
  property: InputSchemaProperty | undefined,
): SelectOption[] => {
  if (!isDefined(property) || !isNonEmptyArray(property.enum)) {
    return [];
  }

  return property.enum.map((value) => ({
    value,
    label: value,
  }));
};
