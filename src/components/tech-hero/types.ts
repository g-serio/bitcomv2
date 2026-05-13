import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { TechHeroSchema } from './schema';

export type TechHeroData = z.infer<typeof TechHeroSchema>;
export type TechHeroSettings = z.infer<typeof BaseSectionSettingsSchema>;
