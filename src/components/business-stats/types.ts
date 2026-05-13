import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { BusinessStatsSchema } from './schema';

export type BusinessStatsData = z.infer<typeof BusinessStatsSchema>;
export type BusinessStatsSettings = z.infer<typeof BaseSectionSettingsSchema>;
