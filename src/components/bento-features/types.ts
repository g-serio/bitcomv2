import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { BentoFeaturesSchema } from './schema';
export type BentoFeaturesData = z.infer<typeof BentoFeaturesSchema>;
export type BentoFeaturesSettings = z.infer<typeof BaseSectionSettingsSchema>;

