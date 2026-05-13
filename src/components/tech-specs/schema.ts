import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const SpecCategorySchema = BaseArrayItem.extend({
  title: z.string().describe('ui:text'),
  items: z.array(z.object({
    name: z.string(),
    value: z.string(),
  })).describe('ui:list'),
});

export const TechSpecsSchema = BaseSectionData.extend({
  eyebrow: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  description: z.string().optional().describe('ui:textarea'),
  categories: z.array(SpecCategorySchema).describe('ui:list'),
});
