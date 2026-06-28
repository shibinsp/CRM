import { Command } from 'nest-commander';

import { isDefined } from 'beeax-shared/utils';

import { ActiveOrSuspendedWorkspaceCommandRunner } from 'src/database/commands/command-runners/active-or-suspended-workspace.command-runner';
import { WorkspaceIteratorService } from 'src/database/commands/command-runners/workspace-iterator.service';
import { type RunOnWorkspaceArgs } from 'src/database/commands/command-runners/workspace.command-runner';
import { GlobalWorkspaceOrmManager } from 'src/engine/beeax-orm/global-workspace-datasource/global-workspace-orm.manager';
import { type MessageThreadWorkspaceEntity } from 'src/modules/messaging/common/standard-objects/message-thread.workspace-entity';
import { type MessageWorkspaceEntity } from 'src/modules/messaging/common/standard-objects/message.workspace-entity';

const snippet = (text: string | null | undefined, max = 140): string => {
  const clean = (text ?? '').replace(/\s+/g, ' ').trim();

  return clean.length > max ? `${clean.slice(0, max)}…` : clean;
};

// Rule-based thread summary + suggested reply. Swap in an LLM call here when an
// OPENAI_API_KEY / ANTHROPIC_API_KEY is configured, falling back to this.
const buildThreadSummary = (
  thread: MessageThreadWorkspaceEntity,
  messages: MessageWorkspaceEntity[],
): string => {
  const ordered = [...messages].sort(
    (a, b) =>
      new Date(a.receivedAt ?? 0).getTime() -
      new Date(b.receivedAt ?? 0).getTime(),
  );
  const latest = ordered[ordered.length - 1];
  const subject = thread.subject ?? latest?.subject ?? 'No subject';

  const summary = `Summary: thread "${subject}" with ${messages.length} message(s). Latest: "${snippet(latest?.text)}"`;
  const reply = `Suggested reply: Hi — thanks for your note on "${subject}". I've reviewed it and will follow up with next steps shortly. Best regards.`;

  return `${summary}\n${reply}`;
};

@Command({
  name: 'messageThread:summarize',
  description:
    'Generate an AI summary + suggested reply (aiSummary) for every message thread in each active/suspended workspace',
})
export class MessageThreadSummarizeCommand extends ActiveOrSuspendedWorkspaceCommandRunner {
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

    let threadRepository;
    let messageRepository;

    try {
      threadRepository =
        await this.twentyORMGlobalManager.getRepository<MessageThreadWorkspaceEntity>(
          workspaceId,
          'messageThread',
          { shouldBypassPermissionChecks: true },
        );
      messageRepository =
        await this.twentyORMGlobalManager.getRepository<MessageWorkspaceEntity>(
          workspaceId,
          'message',
          { shouldBypassPermissionChecks: true },
        );
    } catch {
      this.logger.log(
        `No messaging objects for workspace ${workspaceId}, skipping`,
      );

      return;
    }

    const threads = await threadRepository.find();
    const messages = await messageRepository.find();

    const messagesByThreadId = new Map<string, MessageWorkspaceEntity[]>();

    for (const message of messages) {
      if (!isDefined(message.messageThreadId)) {
        continue;
      }

      const bucket = messagesByThreadId.get(message.messageThreadId) ?? [];

      bucket.push(message);
      messagesByThreadId.set(message.messageThreadId, bucket);
    }

    let updatedCount = 0;

    for (const thread of threads) {
      const threadMessages = messagesByThreadId.get(thread.id) ?? [];

      if (threadMessages.length === 0) {
        continue;
      }

      const aiSummary = buildThreadSummary(thread, threadMessages);

      if (thread.aiSummary === aiSummary) {
        continue;
      }

      if (!isDryRun) {
        await threadRepository.update(thread.id, { aiSummary });
      }

      updatedCount += 1;
    }

    this.logger.log(
      `${isDryRun ? '[DRY RUN] ' : ''}Summarized ${updatedCount}/${threads.length} message threads for workspace ${workspaceId}`,
    );
  }
}
