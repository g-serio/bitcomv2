import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { HoursLocationSchema } from './schema';

export type HoursLocationData = z.infer<typeof HoursLocationSchema>;
export type HoursLocationSettings = z.infer<typeof BaseSectionSettingsSchema>;
