import { z } from 'zod';
import { BaseSectionData, ImageSelectionSchema, CtaSchema } from '@olonjs/core';

export const TechHeroSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:textarea'),
  titleHighlight: z.string().optional().describe('ui:text'),
  subtitle: z.string().describe('ui:textarea'),
  primaryCta: CtaSchema.optional().describe('ui:cta'),
  secondaryCta: CtaSchema.optional().describe('ui:cta'),
  heroImage: ImageSelectionSchema.optional(),
  yearsFounded: z.string().optional().describe('ui:text'),
  experienceText: z.string().optional().describe('ui:text'),
});
