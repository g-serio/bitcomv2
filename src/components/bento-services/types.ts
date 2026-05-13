import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { BentoServicesSchema } from './schema';
export type BentoServicesData = z.infer<typeof BentoServicesSchema>;
export type BentoServicesSettings = z.infer<typeof BaseSectionSettingsSchema>;
