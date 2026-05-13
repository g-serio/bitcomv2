import { z } from 'zod';
import { BaseSectionData, ImageSelectionSchema } from '@olonjs/core';

export const EditorialAboutSchema = BaseSectionData.extend({
  title: z.string().describe('ui:text'),
  subtitle: z.string().describe('ui:text'),
  content: z.string().describe('ui:textarea'),
  sinceYear: z.string().optional().describe('ui:text'),
  image: ImageSelectionSchema.optional(),
});
