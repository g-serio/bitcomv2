import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { ReviewGridSchema } from './schema';
export type ReviewGridData = z.infer<typeof ReviewGridSchema>;
export type ReviewGridSettings = z.infer<typeof BaseSectionSettingsSchema>;
