import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { HistoryTimelineSchema } from './schema';
export type HistoryTimelineData = z.infer<typeof HistoryTimelineSchema>;
export type HistoryTimelineSettings = z.infer<typeof BaseSectionSettingsSchema>;

