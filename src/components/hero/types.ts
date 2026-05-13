import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { HeroSchema } from './schema';
export type HeroData = z.infer<typeof HeroSchema>;
export type HeroSettings = z.infer<typeof BaseSectionSettingsSchema>;

