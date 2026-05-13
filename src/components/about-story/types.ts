import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { AboutStorySchema } from './schema';

export type AboutStoryData = z.infer<typeof AboutStorySchema>;
export type AboutStorySettings = z.infer<typeof BaseSectionSettingsSchema>;
