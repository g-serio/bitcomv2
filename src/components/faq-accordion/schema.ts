import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const FaqItemSchema = BaseArrayItem.extend({
  question: z.string().describe('ui:text'),
  answer: z.string().describe('ui:textarea'),
});

export const FaqAccordionSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  subtitle: z.string().optional().describe('ui:textarea'),
  faqs: z.array(FaqItemSchema).describe('ui:list'),
});
