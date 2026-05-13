import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { ReviewsSliderSchema } from './schema';
export type ReviewsSliderData = z.infer<typeof ReviewsSliderSchema>;
export type ReviewsSliderSettings = z.infer<typeof BaseSectionSettingsSchema>;

