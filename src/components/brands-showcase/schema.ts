import { z } from 'zod';
import { BaseSectionData, BaseArrayItem, ImageSelectionSchema } from '@olonjs/core';

const BrandItemSchema = BaseArrayItem.extend({
  name: z.string().describe('ui:text'),
  logo: ImageSelectionSchema.optional(),
  category: z.string().optional().describe('ui:text'),
});

export const BrandsShowcaseSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  subtitle: z.string().optional().describe('ui:textarea'),
  brands: z.array(BrandItemSchema).describe('ui:list'),
});
