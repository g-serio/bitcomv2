import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { TestimonialsBandSchema } from './schema';

export type TestimonialsBandData = z.infer<typeof TestimonialsBandSchema>;
export type TestimonialsBandSettings = z.infer<typeof BaseSectionSettingsSchema>;
