import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const ServiceItemSchema = BaseArrayItem.extend({
  title: z.string().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
  tag: z.string().optional().describe('ui:text'),
});

export const ServiceCardsSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  items: z.array(ServiceItemSchema).describe('ui:list'),
});

