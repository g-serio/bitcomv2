import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { BusinessSolutionsSchema } from './schema';
export type BusinessSolutionsData = z.infer<typeof BusinessSolutionsSchema>;
export type BusinessSolutionsSettings = z.infer<typeof BaseSectionSettingsSchema>;

