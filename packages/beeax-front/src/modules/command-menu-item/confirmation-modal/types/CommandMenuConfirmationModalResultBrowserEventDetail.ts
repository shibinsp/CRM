import { type ConfirmationModalCaller } from 'beeax-shared/types';

export type CommandMenuConfirmationModalResult = 'confirm' | 'cancel';

export type CommandMenuConfirmationModalResultBrowserEventDetail = {
  caller: ConfirmationModalCaller;
  confirmationResult: CommandMenuConfirmationModalResult;
};
