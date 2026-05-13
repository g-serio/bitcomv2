import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { ProcessAccordionSchema } from './schema';
export type ProcessAccordionData = z.infer<typeof ProcessAccordionSchema>;
export type ProcessAccordionSettings = z.infer<typeof BaseSectionSettingsSchema>;

