import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { ServicesGridSchema } from './schema';
export type ServicesGridData = z.infer<typeof ServicesGridSchema>;
export type ServicesGridSettings = z.infer<typeof BaseSectionSettingsSchema>;

