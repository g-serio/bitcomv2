import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { TechSpecsSchema } from './schema';

export type TechSpecsData = z.infer<typeof TechSpecsSchema>;
export type TechSpecsSettings = z.infer<typeof BaseSectionSettingsSchema>;
