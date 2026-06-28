import { type jsonRelationFilterValueSchema } from 'beeax-shared/utils';
import { type z } from 'zod';

export type RelationFilterValue = z.infer<typeof jsonRelationFilterValueSchema>;
