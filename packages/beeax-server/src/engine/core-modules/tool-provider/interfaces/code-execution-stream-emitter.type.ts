import { type CodeExecutionData } from 'beeax-shared/ai';

export type CodeExecutionStreamEmitter = (data: CodeExecutionData) => void;
