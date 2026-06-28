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

type ScoreResult = { score: number; reason: string; insights: string };

const NEXT_STEP_BY_STAGE: Record<string, string> = {
  NEW: 'Qualify the opportunity and book a discovery call.',
  SCREENING: 'Confirm budget, authority and decision criteria.',
  MEETING: 'Send a tailored proposal aligned to their needs.',
  PROPOSAL: 'Follow up on the proposal and resolve objections.',
  CUSTOMER: 'Onboard the customer and identify expansion.',
};

// Deterministic, rule-based deal scoring + insights (stage + deal size + close date).
// To upgrade to LLM-generated scoring/insights, call the AI provider here when an
// OPENAI_API_KEY / ANTHROPIC_API_KEY is configured and fall back to this.
const computeOpportunityScore = (
  opportunity: OpportunityWorkspaceEntity,
): ScoreResult => {
  const base = STAGE_BASE_SCORE[opportunity.stage] ?? 30;
  const dollars = (opportunity.amount?.amountMicros ?? 0) / 1_000_000;
  const sizeBonus = Math.min(5, dollars / 10_000);
  const score = Math.min(100, Math.round(base + sizeBonus));
  const sizeK = Math.round(dollars / 1000);
  const reason = `AI score (rule-based): ${opportunity.stage} stage, $${sizeK}k deal size`;

  const nextStep =
    NEXT_STEP_BY_STAGE[opportunity.stage] ?? 'Review the opportunity.';

  const closeDate = opportunity.closeDate
    ? new Date(opportunity.closeDate)
    : null;
  const isOverdue =
    isDefined(closeDate) &&
    closeDate.getTime() < Date.now() &&
    opportunity.stage !== 'CUSTOMER';
  const risk = isOverdue
    ? 'Close date has passed — deal may be stalled.'
    : dollars >= 50_000 && ['NEW', 'SCREENING'].includes(opportunity.stage)
      ? 'Large deal still early — secure an executive sponsor.'
      : 'No major risks detected.';

  const insights = [
    `Summary: "${opportunity.name ?? 'Untitled'}" is a $${sizeK}k deal at the ${opportunity.stage} stage (score ${score}/100).`,
    `Next step: ${nextStep}`,
    `Risk: ${risk}`,
  ].join('\n');

  return { score, reason, insights };
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
      const { score, reason, insights } = computeOpportunityScore(opportunity);

      if (
        opportunity.aiScore === score &&
        opportunity.aiScoreReason === reason &&
        opportunity.aiInsights === insights
      ) {
        continue;
      }

      if (!isDryRun) {
        await opportunityRepository.update(opportunity.id, {
          aiScore: score,
          aiScoreReason: reason,
          aiInsights: insights,
        });
      }

      updatedCount += 1;
    }

    this.logger.log(
      `${isDryRun ? '[DRY RUN] ' : ''}Scored ${updatedCount}/${opportunities.length} opportunities for workspace ${workspaceId}`,
    );
  }
}
