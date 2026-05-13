import { z } from 'zod';
import { BaseSectionSettingsSchema } from '@olonjs/core';
import { ReviewsCarouselSchema } from './schema';
export type ReviewsCarouselData = z.infer<typeof ReviewsCarouselSchema>;
export type ReviewsCarouselSettings = z.infer<typeof BaseSectionSettingsSchema>;

