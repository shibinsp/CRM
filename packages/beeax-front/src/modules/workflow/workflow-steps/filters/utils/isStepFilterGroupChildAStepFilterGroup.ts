import { type StepFilter, type StepFilterGroup } from 'beeax-shared/types';

export const isStepFilterGroupChildAStepFilterGroup = (
  child: StepFilter | StepFilterGroup,
): child is StepFilterGroup => {
  return ('logicalOperator' satisfies keyof StepFilterGroup) in child;
};
