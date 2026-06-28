import { Command } from 'nest-commander';

import { isDefined } from 'beeax-shared/utils';

import { ActiveOrSuspendedWorkspaceCommandRunner } from 'src/database/commands/command-runners/active-or-suspended-workspace.command-runner';
import { WorkspaceIteratorService } from 'src/database/commands/command-runners/workspace-iterator.service';
import { type RunOnWorkspaceArgs } from 'src/database/commands/command-runners/workspace.command-runner';
import { GlobalWorkspaceOrmManager } from 'src/engine/beeax-orm/global-workspace-datasource/global-workspace-orm.manager';
import { type OpportunityWorkspaceEntity } from 'src/modules/opportunity/standard-objects/opportunity.workspace-entity';

// Win-likelihood weight per pipeline stage.
const STAGE_BASE_SCORE: Record<string, number> = {
  NEW: 20,
  SCREENING: 40,
  MEETING: 60,
  PROPOSAL: 80,
  CUSTOMER: 95,
};

type ScoreResult = { score: number; reason: string };

// Deterministic, rule-based deal scoring (stage weight + deal-size bonus).
// To upgrade to LLM scoring, call the AI provider here when an
// OPENAI_API_KEY / ANTHROPIC_API_KEY is configured and fall back to this.
const computeOpportunityScore = (
  opportunity: OpportunityWorkspaceEntity,
): ScoreResult => {
  const base = STAGE_BASE_SCORE[opportunity.stage] ?? 30;
  const dollars = (opportunity.amount?.amountMicros ?? 0) / 1_000_000;
  const sizeBonus = Math.min(5, dollars / 10_000);
  const score = Math.min(100, Math.round(base + sizeBonus));
  const reason = `AI score (rule-based): ${opportunity.stage} stage, $${Math.round(
    dollars / 1000,
  )}k deal size`;

  return { score, reason };
};

@Command({
  name: 'opportunity:score',
  description:
    'Compute and store the AI win-likelihood score (aiScore + aiScoreReason) for every opportunity in each active/suspended workspace',
})
export class OpportunityScoreCommand extends ActiveOrSuspendedWorkspaceCommandRunner {
  constructor(
    protected readonly workspaceIteratorService: WorkspaceIteratorService,
    private readonly twentyORMGlobalManager: GlobalWorkspaceOrmManager,
  ) {
    super(workspaceIteratorService);
  }

  override async runOnWorkspace({
    workspaceId,
    options,
  }: RunOnWorkspaceArgs): Promise<void> {
    const isDryRun = options.dryRun ?? false;

    let opportunityRepository;

    try {
      opportunityRepository =
        await this.twentyORMGlobalManager.getRepository<OpportunityWorkspaceEntity>(
          workspaceId,
          'opportunity',
          { shouldBypassPermissionChecks: true },
        );
    } catch {
      // Workspace has no opportunity object (not yet provisioned) — skip.
      this.logger.log(
        `No opportunity object for workspace ${workspaceId}, skipping`,
      );

      return;
    }

    const opportunities = await opportunityRepository.find();

    let updatedCount = 0;

    for (const opportunity of opportunities) {
      const { score, reason } = computeOpportunityScore(opportunity);

      if (opportunity.aiScore === score && opportunity.aiScoreReason === reason) {
        continue;
      }

      if (!isDryRun) {
        await opportunityRepository.update(opportunity.id, {
          aiScore: score,
          aiScoreReason: reason,
        });
      }

      updatedCount += 1;
    }

    this.logger.log(
      `${isDryRun ? '[DRY RUN] ' : ''}Scored ${updatedCount}/${opportunities.length} opportunities for workspace ${workspaceId}`,
    );
  }
}
