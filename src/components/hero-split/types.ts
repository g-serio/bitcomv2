import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { HeroSplitSchema } from './schema';
export type HeroSplitData = z.infer<typeof HeroSplitSchema>;
export type HeroSplitSettings = z.infer<typeof BaseSectionSettingsSchema>;

