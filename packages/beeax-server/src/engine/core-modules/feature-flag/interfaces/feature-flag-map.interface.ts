import { type FeatureFlagKey } from 'beeax-shared/types';

export type FeatureFlagMap = Record<`${FeatureFlagKey}`, boolean>;
