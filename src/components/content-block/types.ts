import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { ContentBlockSchema } from './schema';

export type ContentBlockData = z.infer<typeof ContentBlockSchema>;
export type ContentBlockSettings = z.infer<typeof BaseSectionSettingsSchema>;
