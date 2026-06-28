import { type EmailAttachment } from 'beeax-shared/types';
import { type EmailRecipients } from 'beeax-shared/workflow';

export type WorkflowSendEmailActionInput = {
  connectedAccountId: string;
  recipients: EmailRecipients;
  subject?: string;
  body?: string;
  files?: EmailAttachment[];
  inReplyTo?: string;
};
