import { z } from 'zod';
import { BaseSectionData, BaseArrayItem, CtaSchema } from '@olonjs/core';

const SolutionItemSchema = BaseArrayItem.extend({
  title: z.string().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
});

export const ProSolutionsSchema = BaseSectionData.extend({
  title: z.string().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
  solutions: z.array(SolutionItemSchema).describe('ui:list'),
  cta: CtaSchema.optional(),
});
