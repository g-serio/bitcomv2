import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const SolutionItemSchema = BaseArrayItem.extend({
  title: z.string().describe('ui:text'),
  content: z.string().describe('ui:textarea'),
});

export const BusinessSolutionsSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
  items: z.array(SolutionItemSchema).describe('ui:list'),
});

