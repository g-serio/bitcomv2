import { z } from 'zod';
import { BaseSectionData, ImageSelectionSchema, CtaSchema } from '@olonjs/core';

export const ContentBlockSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  content: z.string().describe('ui:textarea'),
  blockImage: ImageSelectionSchema.optional(),
  primaryCta: CtaSchema.optional().describe('ui:cta'),
  layout: z.enum(['centered', 'image-left', 'image-right']).optional().describe('ui:select'),
});
