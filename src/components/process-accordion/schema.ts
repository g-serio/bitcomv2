import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const ProcessItemSchema = BaseArrayItem.extend({
  title: z.string().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
});

export const ProcessAccordionSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  description: z.string().optional().describe('ui:textarea'),
  items: z.array(ProcessItemSchema).describe('ui:list'),
});

