import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { ProSolutionsSchema } from './schema';
export type ProSolutionsData = z.infer<typeof ProSolutionsSchema>;
export type ProSolutionsSettings = z.infer<typeof BaseSectionSettingsSchema>;
