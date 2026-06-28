import { type FieldMetadataType } from 'beeax-shared/types';
import { pascalCase } from 'beeax-shared/utils';

import { ObjectTypeDefinitionKind } from 'src/engine/api/graphql/workspace-schema-builder/enums/object-type-definition-kind.enum';

export const computeCompositeFieldObjectTypeKey = (
  compositeFieldMetadataType: FieldMetadataType,
): string => {
  return `${pascalCase(compositeFieldMetadataType)}${ObjectTypeDefinitionKind.Plain.toString()}`;
};
