import { z } from 'zod';
import { BaseSectionData, CtaSchema, ImageSelectionSchema } from '@olonjs/core';

export const HeroSplitSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:textarea'),
  description: z.string().optional().describe('ui:textarea'),
  primaryCta: CtaSchema.optional(),
  secondaryCta: CtaSchema.optional(),
  image: ImageSelectionSchema.optional(),
});

