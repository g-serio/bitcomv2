import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { CtaBandSchema } from './schema';
export type CtaBandData = z.infer<typeof CtaBandSchema>;
export type CtaBandSettings = z.infer<typeof BaseSectionSettingsSchema>;

