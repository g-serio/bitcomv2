import { z } from 'zod';
import { BaseSectionData, BaseArrayItem, ImageSelectionSchema, CtaSchema } from '@olonjs/core';

const FeatureItemSchema = BaseArrayItem.extend({
  text: z.string().describe('ui:text'),
});

export const ServiceDetailSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
  serviceImage: ImageSelectionSchema.optional(),
  features: z.array(FeatureItemSchema).describe('ui:list'),
  primaryCta: CtaSchema.optional().describe('ui:cta'),
  layout: z.enum(['image-left', 'image-right']).optional().describe('ui:select'),
});
