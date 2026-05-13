import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { HistorySchema } from './schema';
export type HistoryData = z.infer<typeof HistorySchema>;
export type HistorySettings = z.infer<typeof BaseSectionSettingsSchema>;

