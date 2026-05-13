import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { BrandsShowcaseSchema } from './schema';

export type BrandsShowcaseData = z.infer<typeof BrandsShowcaseSchema>;
export type BrandsShowcaseSettings = z.infer<typeof BaseSectionSettingsSchema>;
