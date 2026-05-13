import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { StatLineSchema } from './schema';
export type StatLineData = z.infer<typeof StatLineSchema>;
export type StatLineSettings = z.infer<typeof BaseSectionSettingsSchema>;
