import {
  type ActorMetadata,
  FieldActorSource,
  type FullNameMetadata,
} from 'beeax-shared/types';
import { isDefined } from 'beeax-shared/utils';

type BuildCreatedByFromFullNameMetadataArgs = {
  workspaceMemberId: string;
  fullNameMetadata: FullNameMetadata;
  source?: FieldActorSource;
};
export const buildCreatedByFromFullNameMetadata = ({
  fullNameMetadata,
  workspaceMemberId,
  source = FieldActorSource.MANUAL,
}: BuildCreatedByFromFullNameMetadataArgs): ActorMetadata => ({
  workspaceMemberId,
  source,
  name: `${fullNameMetadata.firstName} ${fullNameMetadata.lastName}`,
  context: {},
});
