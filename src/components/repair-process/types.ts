import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { RepairProcessSchema } from './schema';

export type RepairProcessData = z.infer<typeof RepairProcessSchema>;
export type RepairProcessSettings = z.infer<typeof BaseSectionSettingsSchema>;
