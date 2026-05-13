import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { FaqAccordionSchema } from './schema';

export type FaqAccordionData = z.infer<typeof FaqAccordionSchema>;
export type FaqAccordionSettings = z.infer<typeof BaseSectionSettingsSchema>;
