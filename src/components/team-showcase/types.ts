import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { TeamShowcaseSchema } from './schema';

export type TeamShowcaseData = z.infer<typeof TeamShowcaseSchema>;
export type TeamShowcaseSettings = z.infer<typeof BaseSectionSettingsSchema>;
