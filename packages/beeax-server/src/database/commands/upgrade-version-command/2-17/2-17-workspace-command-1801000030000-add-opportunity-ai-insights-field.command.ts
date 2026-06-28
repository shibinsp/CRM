import { Command } from 'nest-commander';

import { STANDARD_OBJECTS } from 'beeax-shared/metadata';
import { isDefined } from 'beeax-shared/utils';

import { ActiveOrSuspendedWorkspaceCommandRunner } from 'src/database/commands/command-runners/active-or-suspended-workspace.command-runner';
import { WorkspaceIteratorService } from 'src/database/commands/command-runners/workspace-iterator.service';
import { type RunOnWorkspaceArgs } from 'src/database/commands/command-runners/workspace.command-runner';
import { ApplicationService } from 'src/engine/core-modules/application/application.service';
import { RegisteredWorkspaceCommand } from 'src/engine/core-modules/upgrade/decorators/registered-workspace-command.decorator';
import { findFlatEntityByUniversalIdentifier } from 'src/engine/metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util';
import { type FlatFieldMetadata } from 'src/engine/metadata-modules/flat-field-metadata/types/flat-field-metadata.type';
import { type FlatObjectMetadata } from 'src/engine/metadata-modules/flat-object-metadata/types/flat-object-metadata.type';
import { WorkspaceCacheService } from 'src/engine/workspace-cache/services/workspace-cache.service';
import { computeTwentyStandardApplicationAllFlatEntityMaps } from 'src/engine/workspace-manager/beeax-standard-application/utils/beeax-standard-application-all-flat-entity-maps.constant';
import { WorkspaceMigrationValidateBuildAndRunService } from 'src/engine/workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service';

const AI_INSIGHTS_FIELD_UNIVERSAL_IDENTIFIERS = [
  STANDARD_OBJECTS.opportunity.fields.aiInsights.universalIdentifier,
];

@RegisteredWorkspaceCommand('2.17.0', 1801000030000)
@Command({
  name: 'upgrade:2-17:add-opportunity-ai-insights-field',
  description:
    'Create the Opportunity aiInsights standard field on existing workspaces',
})
export class AddOpportunityAiInsightsFieldCommand extends ActiveOrSuspendedWorkspaceCommandRunner {
  constructor(
    protected readonly workspaceIteratorService: WorkspaceIteratorService,
    private readonly applicationService: ApplicationService,
    private readonly workspaceCacheService: WorkspaceCacheService,
    private readonly workspaceMigrationValidateBuildAndRunService: WorkspaceMigrationValidateBuildAndRunService,
  ) {
    super(workspaceIteratorService);
  }

  override async runOnWorkspace({
    workspaceId,
    options,
  }: RunOnWorkspaceArgs): Promise<void> {
    const isDryRun = options.dryRun ?? false;

    const { twentyStandardFlatApplication } =
      await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow(
        { workspaceId },
      );

    const {
      flatFieldMetadataMaps: existingFlatFieldMetadataMaps,
      flatObjectMetadataMaps,
    } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
      'flatFieldMetadataMaps',
      'flatObjectMetadataMaps',
    ]);

    const { allFlatEntityMaps: standardAllFlatEntityMaps } =
      computeTwentyStandardApplicationAllFlatEntityMaps({
        now: new Date().toISOString(),
        workspaceId,
        twentyStandardApplicationId: twentyStandardFlatApplication.id,
      });

    const fieldsToCreate: FlatFieldMetadata[] = [];

    for (const universalIdentifier of AI_INSIGHTS_FIELD_UNIVERSAL_IDENTIFIERS) {
      const standardFlatFieldMetadata =
        standardAllFlatEntityMaps.flatFieldMetadataMaps.byUniversalIdentifier[
          universalIdentifier
        ];

      if (!isDefined(standardFlatFieldMetadata)) {
        continue;
      }

      const fieldAlreadyExists = isDefined(
        existingFlatFieldMetadataMaps.byUniversalIdentifier[universalIdentifier],
      );

      if (fieldAlreadyExists) {
        continue;
      }

      const targetObjectExists = isDefined(
        findFlatEntityByUniversalIdentifier<FlatObjectMetadata>({
          flatEntityMaps: flatObjectMetadataMaps,
          universalIdentifier:
            standardFlatFieldMetadata.objectMetadataUniversalIdentifier,
        }),
      );

      if (!targetObjectExists) {
        continue;
      }

      fieldsToCreate.push({
        ...standardFlatFieldMetadata,
        isActive: true,
        viewFieldIds: [],
        viewFieldUniversalIdentifiers: [],
      });
    }

    if (fieldsToCreate.length === 0) {
      this.logger.log(
        `Opportunity AI insights field already exists for workspace ${workspaceId}, skipping`,
      );

      return;
    }

    this.logger.log(
      `${isDryRun ? '[DRY RUN] ' : ''}Creating ${fieldsToCreate.length} Opportunity AI insights field(s) for workspace ${workspaceId}`,
    );

    if (isDryRun) {
      return;
    }

    const validateAndBuildResult =
      await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration(
        {
          allFlatEntityOperationByMetadataName: {
            fieldMetadata: {
              flatEntityToCreate: fieldsToCreate,
              flatEntityToDelete: [],
              flatEntityToUpdate: [],
            },
          },
          workspaceId,
          applicationUniversalIdentifier:
            twentyStandardFlatApplication.universalIdentifier,
        },
      );

    if (validateAndBuildResult.status === 'fail') {
      this.logger.error(
        `Failed to create Opportunity AI insights field:\n${JSON.stringify(validateAndBuildResult, null, 2)}`,
      );

      throw new Error(
        `Failed to create Opportunity AI insights field for workspace ${workspaceId}`,
      );
    }

    this.logger.log(
      `Successfully created ${fieldsToCreate.length} Opportunity AI insights field(s) for workspace ${workspaceId}`,
    );
  }
}
