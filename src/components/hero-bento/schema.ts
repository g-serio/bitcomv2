import { z } from 'zod';
import { BaseSectionData, CtaSchema, ImageSelectionSchema } from '@olonjs/core';

export const HeroBentoSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:textarea'),
  titleHighlight: z.string().optional().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
  primaryCta: CtaSchema.optional(),
  secondaryCta: CtaSchema.optional(),
  stat1Value: z.string().optional().describe('ui:text'),
  stat1Label: z.string().optional().describe('ui:text'),
  stat2Value: z.string().optional().describe('ui:text'),
  stat2Label: z.string().optional().describe('ui:text'),
  address: z.string().optional().describe('ui:text'),
  featureImage: ImageSelectionSchema.optional(),
  featureTitle: z.string().optional().describe('ui:text'),
  features: z.array(z.object({
    id: z.string().optional(),
    text: z.string()
  })).optional().describe('ui:list')
});
