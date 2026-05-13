import { z } from 'zod';
import { BaseSectionData, BaseArrayItem } from '@olonjs/core';

const ServiceItemSchema = BaseArrayItem.extend({
  title: z.string().describe('ui:text'),
  description: z.string().describe('ui:textarea'),
  icon: z.string().optional().describe('ui:icon-picker'),
  tag: z.string().optional().describe('ui:text'),
  isLarge: z.boolean().optional().describe('ui:checkbox'),
});

export const BentoServicesSchema = BaseSectionData.extend({
  label: z.string().optional().describe('ui:text'),
  title: z.string().describe('ui:text'),
  items: z.array(ServiceItemSchema).describe('ui:list'),
});
