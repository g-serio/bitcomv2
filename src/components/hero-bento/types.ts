import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { HeroBentoSchema } from './schema';
export type HeroBentoData = z.infer<typeof HeroBentoSchema>;
export type HeroBentoSettings = z.infer<typeof BaseSectionSettingsSchema>;

